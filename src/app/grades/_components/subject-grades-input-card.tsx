"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Subject } from "@/types/subjects";
import { useState } from "react";

interface SubjectGradesInputCardProps {
  subject: Subject;
  grades: Record<string, number>;
  onGradeChange: (examOrAssignment: string, grade: number) => void;
}

export function SubjectGradesInputCard({
  subject,
  grades,
  onGradeChange,
}: SubjectGradesInputCardProps) {
  const [isGradesPanelOpen, setIsGradesPanelOpen] = useState(false);

  return (
    <Card className="border-none py-4 flex flex-col shadow-none">
      <Collapsible open={isGradesPanelOpen} onOpenChange={setIsGradesPanelOpen}>
        <div className="flex items-center justify-between">
          <CardHeader className="space-y-0 p-0">
            <CardDescription>{subject.code}</CardDescription>
            <CardTitle className="text-secondary-foreground text-xl font-bold">
              {subject.name}
            </CardTitle>
          </CardHeader>
          <CollapsibleTrigger className="text-sm text-muted-foreground">
            {isGradesPanelOpen ? "Esconder" : "Mostrar"} detalhes
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="pt-2">
          <CardContent className="px-0 py-2 flex flex-col gap-4">
            {subject.examWeight > 0 && subject.exams && (
              <section className="flex flex-col gap-2">
                <h3 className="font-semibold text-base">
                  Provas ({subject.examWeight.toFixed(0)}%)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {subject.exams.map((exam) => (
                    <div key={exam.name}>
                      <Label htmlFor={`${subject.code}-${exam.name}`}>
                        {exam.name} ({exam.weight})
                      </Label>
                      <Input
                        id={`${subject.code}-${exam.name}`}
                        type="number"
                        min="0"
                        max="10"
                        value={grades[exam.name] || ""}
                        onChange={(e) =>
                          onGradeChange(exam.name, Number(e.target.value))
                        }
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {subject.assignmentWeight > 0 && subject.assignments && (
              <section>
                <h3 className="font-semibold mb-2">
                  Trabalhos ({subject.assignmentWeight}%)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {subject.assignments.map((assignment) => (
                    <div key={assignment.name}>
                      <Label htmlFor={`${subject.code}-${assignment.name}`}>
                        {assignment.name} ({assignment.weight})
                      </Label>
                      <Input
                        id={`${subject.code}-${assignment.name}`}
                        type="number"
                        min="0"
                        max="10"
                        value={grades[assignment.name] || ""}
                        onChange={(e) =>
                          onGradeChange(assignment.name, Number(e.target.value))
                        }
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
