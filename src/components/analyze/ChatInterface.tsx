import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  code: string;
}

const suggestedQuestions = [
  "¿Qué hace este código?",
  "¿Cómo puedo optimizarlo?",
  "Explica línea por línea",
  "Genera tests unitarios",
];

export function ChatInterface({ code }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "¡Hola! Soy tu asistente de código. Puedo ayudarte a entender, mejorar y depurar tu código Python. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (message?: string) => {
    const text = message || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "¿Qué hace este código?": `Este código define una función \`hello_world()\` que:\n\n1. Crea un mensaje de saludo\n2. Lo imprime en la consola\n3. Retorna el mensaje\n\nLuego, la función es llamada y el resultado se guarda en la variable \`result\`.`,
        "¿Cómo puedo optimizarlo?": `Tu código es bastante simple y eficiente. Sin embargo, aquí hay algunas sugerencias:\n\n1. **Añadir type hints**: \`def hello_world() -> str:\`\n2. **Usar f-strings** si necesitas formateo\n3. **Considerar logging** en lugar de print para producción`,
        "Explica línea por línea": `**Línea 2**: Define la función \`hello_world\`\n**Línea 3**: Docstring describiendo la función\n**Línea 4**: Crea variable \`message\`\n**Línea 5**: Imprime el mensaje\n**Línea 6**: Retorna el mensaje\n**Línea 9**: Llama a la función`,
        "Genera tests unitarios": `\`\`\`python\nimport unittest\n\nclass TestHelloWorld(unittest.TestCase):\n    def test_returns_string(self):\n        result = hello_world()\n        self.assertIsInstance(result, str)\n    \n    def test_correct_message(self):\n        result = hello_world()\n        self.assertEqual(result, "¡Hola, CodeMentor!")\n\`\`\``,
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[text] || "Entiendo tu pregunta. Basándome en el código que has compartido, puedo ver que es una función simple de Python. ¿Hay algo específico que te gustaría saber sobre ella?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="border-border/50 h-[520px] flex flex-col">
      <CardHeader className="pb-2 border-b border-border/50">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Chat con IA
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested questions */}
      {messages.length < 3 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSend(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}