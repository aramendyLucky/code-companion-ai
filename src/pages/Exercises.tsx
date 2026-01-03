import { useState } from "react";
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Star, 
  Clock, 
  ArrowRight,
  BookOpen,
  Trophy,
  Target
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const exercises = [
  {
    id: 1,
    title: "Suma de dos números",
    description: "Escribe una función que sume dos números y retorne el resultado.",
    difficulty: "Principiante",
    duration: "5 min",
    completed: true,
    category: "Básicos",
    points: 10,
  },
  {
    id: 2,
    title: "Palíndromos",
    description: "Escribe una función que determine si una cadena es un palíndromo.",
    difficulty: "Principiante",
    duration: "10 min",
    completed: true,
    category: "Strings",
    points: 15,
  },
  {
    id: 3,
    title: "FizzBuzz",
    description: "Implementa el clásico problema FizzBuzz para números del 1 al 100.",
    difficulty: "Principiante",
    duration: "10 min",
    completed: true,
    category: "Condicionales",
    points: 15,
  },
  {
    id: 4,
    title: "Fibonacci Iterativo",
    description: "Genera los primeros N números de la secuencia Fibonacci.",
    difficulty: "Intermedio",
    duration: "15 min",
    completed: true,
    category: "Loops",
    points: 25,
  },
  {
    id: 5,
    title: "Ordenamiento Burbuja",
    description: "Implementa el algoritmo de ordenamiento burbuja.",
    difficulty: "Intermedio",
    duration: "20 min",
    completed: false,
    category: "Algoritmos",
    points: 30,
  },
  {
    id: 6,
    title: "Búsqueda Binaria",
    description: "Implementa el algoritmo de búsqueda binaria en una lista ordenada.",
    difficulty: "Intermedio",
    duration: "20 min",
    completed: false,
    category: "Algoritmos",
    points: 30,
  },
  {
    id: 7,
    title: "Clase Persona",
    description: "Crea una clase Persona con atributos y métodos básicos usando OOP.",
    difficulty: "Intermedio",
    duration: "25 min",
    completed: false,
    category: "OOP",
    points: 35,
  },
  {
    id: 8,
    title: "Árbol Binario de Búsqueda",
    description: "Implementa las operaciones básicas de un BST: insertar, buscar y eliminar.",
    difficulty: "Avanzado",
    duration: "45 min",
    completed: false,
    category: "Estructuras de Datos",
    points: 50,
  },
  {
    id: 9,
    title: "Grafo y BFS",
    description: "Implementa un grafo y el algoritmo de búsqueda en anchura (BFS).",
    difficulty: "Avanzado",
    duration: "50 min",
    completed: false,
    category: "Estructuras de Datos",
    points: 55,
  },
];

const difficultyColors: Record<string, string> = {
  "Principiante": "bg-success/10 text-success border-success/30",
  "Intermedio": "bg-warning/10 text-warning border-warning/30",
  "Avanzado": "bg-destructive/10 text-destructive border-destructive/30",
};

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || 
      exercise.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  const completedCount = exercises.filter(e => e.completed).length;
  const totalPoints = exercises.filter(e => e.completed).reduce((sum, e) => sum + e.points, 0);
  const progressPercentage = (completedCount / exercises.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-8">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Ejercicios de Práctica</h1>
            <p className="text-muted-foreground">
              Mejora tus habilidades con ejercicios progresivos y validación automática.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{completedCount}/{exercises.length}</div>
                  <div className="text-sm text-muted-foreground">Completados</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Trophy className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Puntos ganados</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progreso total</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ejercicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="principiante">Principiante</TabsTrigger>
                <TabsTrigger value="intermedio">Intermedio</TabsTrigger>
                <TabsTrigger value="avanzado">Avanzado</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Exercise grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise, index) => (
              <Card 
                key={exercise.id}
                className={`group hover:shadow-lg transition-all duration-300 animate-fade-in-up border-border/50 ${
                  exercise.completed ? "hover:border-success/30" : "hover:border-primary/30"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
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
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {exercise.title}
                        </h3>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {exercise.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                  <div className="flex items-center gap-4">
                    <Badge className={difficultyColors[exercise.difficulty]}>
                      {exercise.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {exercise.duration}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3" />
                      {exercise.points} pts
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    variant={exercise.completed ? "outline" : "default"} 
                    size="sm" 
                    className="w-full gap-1"
                  >
                    {exercise.completed ? "Revisar" : "Comenzar"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">No se encontraron ejercicios</h3>
              <p className="text-muted-foreground">
                Intenta con otros términos de búsqueda o filtros.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}