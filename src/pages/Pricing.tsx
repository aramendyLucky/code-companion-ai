import { Check, Sparkles, Zap } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Gratis",
    description: "Perfecto para comenzar",
    price: "0",
    period: "siempre",
    features: [
      "10 análisis de código por día",
      "Chat IA básico",
      "20 ejercicios de práctica",
      "Soporte por email",
    ],
    cta: "Comenzar Gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Para desarrolladores serios",
    price: "19",
    period: "mes",
    features: [
      "Análisis ilimitados",
      "Chat IA avanzado con GPT-4",
      "Todos los ejercicios (+100)",
      "Generación de tests unitarios",
      "Exportación PDF/Markdown",
      "Soporte prioritario",
    ],
    cta: "Comenzar Prueba Gratis",
    highlighted: true,
    badge: "Más Popular",
  },
  {
    name: "Equipos",
    description: "Para equipos y empresas",
    price: "49",
    period: "mes/usuario",
    features: [
      "Todo en Pro",
      "Dashboard de equipo",
      "Métricas de progreso",
      "Integración CI/CD",
      "SSO & SAML",
      "Soporte dedicado 24/7",
    ],
    cta: "Contactar Ventas",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4">Precios</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Elige el plan perfecto para{" "}
              <span className="gradient-text">tu aprendizaje</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comienza gratis y escala según tus necesidades. Sin sorpresas, sin costos ocultos.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`relative animate-fade-in-up ${
                  plan.highlighted 
                    ? "border-primary shadow-lg shadow-primary/20" 
                    : "border-border/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="text-center pb-6">
                  <div className="mb-6">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.highlighted && <Zap className="h-4 w-4 mr-2" />}
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* FAQ teaser */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground">
              ¿Tienes preguntas?{" "}
              <a href="#" className="text-primary hover:underline">
                Consulta nuestras FAQ
              </a>{" "}
              o{" "}
              <a href="#" className="text-primary hover:underline">
                contacta con nosotros
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}