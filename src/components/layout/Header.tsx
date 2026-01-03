import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Analizar", href: "/analyze" },
    { label: "Ejercicios", href: "/exercises" },
    { label: "Precios", href: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">
              Code<span className="text-primary">Mentor</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost">Iniciar Sesión</Button>
            <Button>Comenzar Gratis</Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 mt-4 px-4">
                <ThemeToggle />
                <Button variant="ghost" className="flex-1">Iniciar Sesión</Button>
                <Button className="flex-1">Comenzar</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}