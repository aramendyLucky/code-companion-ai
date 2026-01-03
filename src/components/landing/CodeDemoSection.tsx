import { useState } from "react";
import { Check, AlertTriangle, Lightbulb, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sampleCode = `def calculate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

# Ejemplo de uso
result = calculate_fibonacci(10)
print(result)`;

const analysisResults = [
  {
    type: "success",
    icon: Check,
    title: "Código bien estructurado",
    description: "La función sigue buenas prácticas de documentación y estructura.",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Falta docstring",
    description: "Agrega una docstring para documentar los parámetros y el retorno.",
  },
  {
    type: "suggestion",
    icon: Lightbulb,
    title: "Optimización sugerida",
    description: "Considera usar memoización para mejorar el rendimiento en valores grandes de n.",
  },
];

export function CodeDemoSection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mira cómo funciona en <span className="gradient-text">acción</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Analiza cualquier código Python y obtén feedback detallado al instante.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Code Editor */}
          <Card className="overflow-hidden border-border/50">
            <CardHeader className="bg-card border-b border-border/50 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">fibonacci.py</span>
                </div>
                <Badge variant="secondary">Python</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="p-4 text-sm font-mono overflow-x-auto bg-card">
                <code className="text-foreground">{sampleCode}</code>
              </pre>
              <div className="p-4 border-t border-border/50">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing}
                  className="w-full gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Analizar Código
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Resultados del Análisis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showResults ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Haz clic en "Analizar Código" para ver los resultados</p>
                </div>
              ) : (
                <>
                  {analysisResults.map((result, index) => (
                    <div
                      key={result.title}
                      className={`p-4 rounded-lg border animate-slide-in-right ${
                        result.type === "success" 
                          ? "bg-success/10 border-success/30" 
                          : result.type === "warning"
                          ? "bg-warning/10 border-warning/30"
                          : "bg-primary/10 border-primary/30"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-full ${
                          result.type === "success" 
                            ? "bg-success/20 text-success" 
                            : result.type === "warning"
                            ? "bg-warning/20 text-warning"
                            : "bg-primary/20 text-primary"
                        }`}>
                          <result.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{result.title}</h4>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Complexity Metrics */}
                  <div className="mt-6 p-4 rounded-lg bg-card border border-border/50">
                    <h4 className="font-medium mb-3">Métricas de Complejidad</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Temporal</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-success rounded-full" />
                          </div>
                          <span className="text-sm font-mono">O(n)</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Espacial</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-success rounded-full" />
                          </div>
                          <span className="text-sm font-mono">O(n)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function BarChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}