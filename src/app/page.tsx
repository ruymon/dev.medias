export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-6 max-w-5xl mx-auto w-full gap-16">
      <header className="flex flex-col gap-1 items-center text-balance">
        <span className="text-muted-foreground">Olá, Boas-vindas ao novo:</span>
        <h1 className="text-primary font-bold text-5xl">
          Boas-vindas ao Dev médias
        </h1>
        <p className="text-accent-foreground text-lg">
          Uma nova versão, refeita do zero tornando o amado Dev Médias mais
          simples, mais rápido e muito mais moderno!
        </p>
      </header>
    </main>
  );
}
