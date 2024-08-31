"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Subject } from "@/types/subjects";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SubjectCardProps extends Subject {}

export function SubjectCard(subject: SubjectCardProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase();
  const coursesFilter = searchParams.get("courses")?.split(",");

  useEffect(() => {
    const subscribedSubjects = JSON.parse(
      localStorage.getItem("subscribedSubjects") || "{}"
    );
    setIsSubscribed(!!subscribedSubjects[subject.code]);
  }, [subject.code]);

  const highlightText = (text: string) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-600/40">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSubscribe = () => {
    const subscribedSubjects = JSON.parse(
      localStorage.getItem("subscribedSubjects") || "{}"
    );
    if (isSubscribed) {
      delete subscribedSubjects[subject.code];
      toast.message("Removido!", {
        description: `${subject.name} foi removido da sua lista de matérias`,
      });
    } else {
      subscribedSubjects[subject.code] = subject;
      toast.message("Adicionado!", {
        description: `${subject.name} foi adicionado à sua lista de matérias`,
      });
    }
    localStorage.setItem(
      "subscribedSubjects",
      JSON.stringify(subscribedSubjects)
    );
    setIsSubscribed(!isSubscribed);
  };

  return (
    <Card className="border-none py-4 flex flex-col gap-2 shadow-none">
      <div className="flex items-center justify-between">
        <CardHeader className="space-y-0 p-0">
          <CardDescription>{highlightText(subject.code)}</CardDescription>
          <CardTitle className="text-secondary-foreground text-xl font-bold">
            {highlightText(subject.name)}
          </CardTitle>
        </CardHeader>
        <Button
          onClick={handleSubscribe}
          variant={isSubscribed ? "destructive" : "secondary"}
          size={"sm"}
        >
          {isSubscribed ? "Remover" : "Adicionar"}
        </Button>
      </div>

      <Collapsible open={isMoreDetailsOpen} onOpenChange={setIsMoreDetailsOpen}>
        <CollapsibleContent>
          <CardContent className="px-0 py-2 flex items-center gap-6">
            {subject.exams && subject.examWeight > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-accent-foreground text-sm font-semibold">
                  Provas ({subject.examWeight.toFixed(0)}%)
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {subject.exams.map((exam) => (
                    <span key={exam.name}>
                      {exam.name} ({exam.weight.toFixed(2)})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {subject.assignments && subject.assignmentWeight > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-accent-foreground text-sm font-semibold">
                  Trabalhos ({subject.assignmentWeight.toFixed(0)}%)
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {subject.assignments.map((assignment) => (
                    <span key={assignment.name}>
                      {assignment.name} ({assignment.weight.toFixed(2)})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>

        <CardFooter className="justify-between px-0 pb-0 pt-2">
          <Badge>{subject.course}</Badge>

          <CollapsibleTrigger className="text-sm text-muted-foreground">
            {isMoreDetailsOpen ? "Esconder" : "Mostrar"} detalhes
          </CollapsibleTrigger>

          {/* <div className="flex flex-wrap gap-2 mt-1">
          {subject.courses &&
            Object.entries(subject.courses).map(([course, weight]) => (
              <span
                key={course}
                className="text-xs font-medium rounded-full px-2 py-0.5 bg-muted text-muted-foreground"
              >
                {course} ({weight})
              </span>
            ))}
        </div> */}
        </CardFooter>
      </Collapsible>
    </Card>
  );
}
