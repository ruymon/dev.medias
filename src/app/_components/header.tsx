import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <div className="w-full h-16 bg-background/50 backdrop-blur-xl sticky top-0 flex z-10">
      <header className="flex-1 container flex items-center justify-between">
        <span className="text-primary font-bold text-xl tracking-wide">
          dev
          <span className="text-red-500 font-black text-xl">&#46;</span>
          médias
        </span>

        <nav className="hidden h-full md:flex w-fit">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/subjects">Matérias</NavLink>
          <NavLink href="/grades">Minhas notas</NavLink>
          <NavLink href="/awards">Insígnias</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" disabled>
            Entrar
          </Button>
        </div>
      </header>
    </div>
  );
}
