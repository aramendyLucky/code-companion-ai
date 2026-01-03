import { 
  Code2, 
  MessageSquare, 
  GraduationCap, 
  Zap, 
  Shield, 
  BarChart3 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Code2,
    title: "Análisis de Código",
    description: "Detecta errores, antipatrones y malas prácticas. Obtén sugerencias de optimización y refactorización.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Chat Interactivo",
    description: "Pregunta lo que quieras sobre tu código. Obtén explicaciones detalladas y ejemplos personalizados.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: GraduationCap,
    title: "Ejercicios Progresivos",
    description: "Practica con ejercicios desde nivel principiante hasta avanzado con validación automática.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Zap,
    title: "Análisis en Tiempo Real",
    description: "Recibe feedback instantáneo mientras escribes. Sin esperas, sin interrupciones.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Shield,
    title: "Buenas Prácticas PEP 8",
    description: "Aprende a escribir código limpio y profesional siguiendo los estándares de Python.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: BarChart3,
    title: "Métricas de Complejidad",
    description: "Visualiza la complejidad temporal y espacial de tu código con gráficos interactivos.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo lo que necesitas para{" "}
            <span className="gradient-text">dominar Python</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Herramientas potentes impulsadas por inteligencia artificial para 
            acelerar tu aprendizaje de programación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up border-border/50 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}