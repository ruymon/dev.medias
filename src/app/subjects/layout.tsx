import { ReactNode } from "react";

export default function SubjectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col md:flex-row md:py-8 py-6 container md:gap-16 gap-8">
      {children}
    </main>
  );
}
