import { Separator } from "@/components/ui/separator";
import { SearchAndFilterSkeleton } from "./_components/search-and-filter-skeleton";
import { SubjectCardSkeleton } from "./_components/subject-card-skeleton";

interface SubjectsLoadingProps {}

export default function SubjectsLoading({}: SubjectsLoadingProps) {
  return (
    <>
      <aside className="flex flex-col gap-8 md:max-w-80 flex-1 h-fit sticky top-[calc(4rem+2rem)]">
        <header className="flex flex-col gap-1">
          <h1 className="text-primary font-bold text-3xl">
            Matérias{" "}
            <span className="font-normal text-base text-muted-foreground">
              (-)
            </span>
          </h1>
          <span className="text-accent-foreground">Carregando matérias...</span>
        </header>

        <SearchAndFilterSkeleton />
      </aside>

      <ul className="flex flex-col flex-1 w-full gap-2">
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <li key={index}>
              <SubjectCardSkeleton />
              <Separator className="bg-muted/50" />
            </li>
          );
        })}
      </ul>
    </>
  );
}
