import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { 
  Play, 
  Copy, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AnalysisPanel } from "@/components/analyze/AnalysisPanel";
import { ChatInterface } from "@/components/analyze/ChatInterface";

const defaultCode = `# Escribe o pega tu código Python aquí
def hello_world():
    """Una función simple de ejemplo."""
    message = "¡Hola, CodeMentor!"
    print(message)
    return message

# Llama a la función
result = hello_world()
`;

export default function AnalyzePage() {
  const [code, setCode] = useState(defaultCode);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = useCallback(() => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa código para analizar.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        score: 85,
        issues: [
          { type: "info", message: "Código bien estructurado con docstring" },
          { type: "suggestion", message: "Considera usar type hints para mejor legibilidad" },
        ],
        complexity: { time: "O(1)", space: "O(1)" },
        lines: code.split("\n").length,
      });
      setIsAnalyzing(false);
      toast({
        title: "Análisis completado",
        description: "Tu código ha sido analizado exitosamente.",
      });
    }, 1500);
  }, [code, toast]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copiado",
      description: "El código ha sido copiado al portapapeles.",
    });
  };

  const handleReset = () => {
    setCode(defaultCode);
    setAnalysisResult(null);
    toast({
      title: "Reiniciado",
      description: "El editor ha sido reiniciado.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-8">
        <div className="container px-4">
          {/* Page header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Beta</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/30">
                <Sparkles className="h-3 w-3 mr-1" />
                IA Activa
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">Analizar Código</h1>
            <p className="text-muted-foreground">
              Pega tu código Python y obtén análisis detallado, sugerencias de mejora y explicaciones.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor section */}
            <div className="space-y-4">
              <Card className="overflow-hidden border-border/50">
                <CardHeader className="bg-card border-b border-border/50 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                        <div className="w-3 h-3 rounded-full bg-warning/60" />
                        <div className="w-3 h-3 rounded-full bg-success/60" />
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">main.py</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={handleCopy} title="Copiar">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Descargar">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Cargar archivo">
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleReset} title="Reiniciar">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px]">
                    <Editor
                      height="100%"
                      defaultLanguage="python"
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        padding: { top: 16, bottom: 16 },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="w-full gap-2"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Analizando código...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Analizar Código
                  </>
                )}
              </Button>
            </div>

            {/* Results section */}
            <div>
              <Tabs defaultValue="analysis" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="analysis">Análisis</TabsTrigger>
                  <TabsTrigger value="chat">Chat IA</TabsTrigger>
                </TabsList>
                <TabsContent value="analysis" className="mt-4">
                  <AnalysisPanel result={analysisResult} isLoading={isAnalyzing} />
                </TabsContent>
                <TabsContent value="chat" className="mt-4">
                  <ChatInterface code={code} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}