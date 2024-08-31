import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toogle";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <div className="w-full h-16 bg-background/50 backdrop-blur-xl sticky top-0 flex">
      <header className="w-full flex-1 max-w-5xl mx-auto px-6 flex items-center justify-between">
        <span className="text-primary font-bold text-xl tracking-wide">
          dev
          <span className="text-red-500 font-black text-xl">&#46;</span>
          médias
        </span>

        <nav className="flex h-full">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/subjects">Matérias</NavLink>
          <NavLink href="/awards">Insígnias</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm">Entrar</Button>
        </div>
      </header>
    </div>
  );
}
