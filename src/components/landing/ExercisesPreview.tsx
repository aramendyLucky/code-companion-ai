import { ArrowRight, CheckCircle2, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const exercises = [
  {
    id: 1,
    title: "Palíndromos",
    description: "Escribe una función que determine si una cadena es un palíndromo.",
    difficulty: "Principiante",
    duration: "10 min",
    completed: true,
    category: "Strings",
  },
  {
    id: 2,
    title: "Fibonacci Recursivo",
    description: "Implementa la secuencia de Fibonacci usando recursión y memoización.",
    difficulty: "Intermedio",
    duration: "20 min",
    completed: true,
    category: "Recursión",
  },
  {
    id: 3,
    title: "Árbol Binario de Búsqueda",
    description: "Implementa las operaciones básicas de un BST: insertar, buscar y eliminar.",
    difficulty: "Avanzado",
    duration: "45 min",
    completed: false,
    category: "Estructuras de Datos",
  },
];

const difficultyColors: Record<string, string> = {
  "Principiante": "bg-success/10 text-success border-success/30",
  "Intermedio": "bg-warning/10 text-warning border-warning/30",
  "Avanzado": "bg-destructive/10 text-destructive border-destructive/30",
};

export function ExercisesPreview() {
  const completedCount = exercises.filter(e => e.completed).length;
  const progressPercentage = (completedCount / exercises.length) * 100;

  return (
    <section className="py-24">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left side - Info */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <Badge className="mb-4">Ejercicios Prácticos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aprende haciendo con{" "}
              <span className="gradient-text">ejercicios guiados</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Más de 100 ejercicios organizados por nivel de dificultad. 
              Practica conceptos de programación con validación automática y 
              explicaciones detalladas.
            </p>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Tu progreso</span>
                <span className="text-sm text-muted-foreground">{completedCount}/{exercises.length}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <Link to="/exercises">
              <Button className="gap-2">
                Ver Todos los Ejercicios
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Right side - Exercise cards */}
          <div className="lg:w-2/3 space-y-4">
            {exercises.map((exercise, index) => (
              <Card 
                key={exercise.id}
                className={`group hover:shadow-lg transition-all duration-300 animate-fade-in-up border-border/50 ${
                  exercise.completed ? "hover:border-success/30" : "hover:border-primary/30"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {exercise.completed ? (
                        <div className="p-2 rounded-full bg-success/10">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-muted">
                          <Star className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {exercise.title}
                        </h3>
                        <Badge variant="outline" className="mt-1">
                          {exercise.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={difficultyColors[exercise.difficulty]}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exercise.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-0">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {exercise.duration}
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    {exercise.completed ? "Revisar" : "Comenzar"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}