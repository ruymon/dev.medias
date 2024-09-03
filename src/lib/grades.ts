import { SubjectGrades } from "@/types/grades";
import { Subject } from "@/types/subjects";

export function calculateSubjectGrade(
  subject: Subject,
  subjectGrades: SubjectGrades
): number {
  if (subjectGrades.length === 0) {
    return 0;
  }

  const examGrade = subject.exams.reduce((total, exam) => {
    return total + (subjectGrades[exam.name] || 0) * exam.weight;
  }, 0);

  const assignmentGrade = subject.assignments.reduce((total, assignment) => {
    return total + (subjectGrades[assignment.name] || 0) * assignment.weight;
  }, 0);

  return (
    (examGrade * subject.examWeight) / 100 +
    (assignmentGrade * subject.assignmentWeight) / 100
  );
}
