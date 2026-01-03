import { Check, AlertTriangle, Lightbulb, Info, Clock, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalysisResult {
  score: number;
  issues: { type: string; message: string }[];
  complexity: { time: string; space: string };
  lines: number;
}

interface AnalysisPanelProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

export function AnalysisPanel({ result, isLoading }: AnalysisPanelProps) {
  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Gauge className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">Sin análisis aún</h3>
            <p className="text-muted-foreground">
              Escribe código y haz clic en "Analizar Código" para ver los resultados.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "suggestion":
        return <Lightbulb className="h-4 w-4 text-primary" />;
      default:
        return <Info className="h-4 w-4 text-accent" />;
    }
  };

  const getIssueBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-success/10 border-success/30";
      case "warning":
        return "bg-warning/10 border-warning/30";
      case "suggestion":
        return "bg-primary/10 border-primary/30";
      default:
        return "bg-accent/10 border-accent/30";
    }
  };

  return (
    <div className="space-y-4">
      {/* Score card */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Puntuación de Calidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}
            </div>
            <div className="flex-1">
              <Progress 
                value={result.score} 
                className="h-3"
              />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <div className="font-mono font-medium">{result.complexity.time}</div>
            <div className="text-xs text-muted-foreground">Tiempo</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <Gauge className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <div className="font-mono font-medium">{result.complexity.space}</div>
            <div className="text-xs text-muted-foreground">Espacio</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="h-5 w-5 mx-auto mb-1 text-muted-foreground font-mono text-sm flex items-center justify-center">
              #
            </div>
            <div className="font-mono font-medium">{result.lines}</div>
            <div className="text-xs text-muted-foreground">Líneas</div>
          </CardContent>
        </Card>
      </div>

      {/* Issues */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            Observaciones
            <Badge variant="secondary">{result.issues.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {result.issues.map((issue, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${getIssueBg(issue.type)} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-2">
                {getIssueIcon(issue.type)}
                <span className="text-sm">{issue.message}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}