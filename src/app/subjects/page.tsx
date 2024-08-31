import { Separator } from "@/components/ui/separator";
import { getAllSubjects } from "@/lib/subjects";
import { Subject } from "@/types/subjects";
import { Fragment } from "react";
import { SearchAndFilter } from "./_components/search-and-filter";
import { SubjectCard } from "./_components/subject-card";

interface ListSubjectsPageProps {
  searchParams: { search?: string; courses?: string };
}

export default async function ListSubjectsPage({
  searchParams,
}: ListSubjectsPageProps) {
  const subjectsData = await getAllSubjects();
  const subjectsArray = Object.values(subjectsData);

  const selectedCourses = searchParams.courses
    ? searchParams.courses.split(",")
    : [];

  const filteredSubjects = subjectsArray.filter((subject: Subject) => {
    const matchesSearch =
      !searchParams.search ||
      subject.name.toLowerCase().includes(searchParams.search.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchParams.search.toLowerCase());

    const matchesCourse =
      selectedCourses.length === 0 ||
      selectedCourses.some((course) => subject.course === course);

    return matchesSearch && matchesCourse;
  });

  return (
    <main className="flex py-8 px-6 max-w-5xl mx-auto w-full gap-16">
      <aside className="flex flex-col gap-8 max-w-[30%]">
        <header className="flex flex-col gap-1">
          <h1 className="text-primary font-bold text-3xl">
            Matérias{" "}
            <span className="font-normal text-base text-accent-foreground">
              ({filteredSubjects.length})
            </span>
          </h1>
          <span className="text-accent-foreground">
            Veja todas as matérias disponíveis
          </span>
        </header>

        <SearchAndFilter subjects={subjectsArray} />
      </aside>

      <ul className="flex flex-col flex-1 gap-2">
        {filteredSubjects.map((subject: Subject) => {
          return (
            <Fragment key={subject.code}>
              <SubjectCard {...subject} />
              <Separator className="bg-muted" />
            </Fragment>
          );
        })}

        {filteredSubjects.length === 0 && (
          <div className="w-full py-4 flex-col flex items-center justify-center">
            <h3 className="text-lg font-medium text-accent-foreground">
              Eita... Algo deu errado.
            </h3>
            <span className="text-muted-foreground text-sm font-normal">
              Nenhuma matéria encontrada com os filtros aplicados.
            </span>
          </div>
        )}
      </ul>
    </main>
  );
}
