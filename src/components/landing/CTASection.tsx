import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Gratis para comenzar</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comienza a programar{" "}
            <span className="gradient-text">mejor hoy mismo</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Únete a miles de desarrolladores que ya están mejorando su código 
            con la ayuda de inteligencia artificial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/analyze">
              <Button size="lg" className="gap-2 glow px-8">
                Crear Cuenta Gratis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              Explorar Documentación
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No se requiere tarjeta de crédito · Cancela cuando quieras
          </p>
        </div>
      </div>
    </section>
  );
}