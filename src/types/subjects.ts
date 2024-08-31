export interface Subject {
  course: string;
  name: string;
  code: string;
  period: string;
  examWeight: number;
  assignmentWeight: number;
  exams: { name: string; weight: number }[];
  assignments: { name: string; weight: number }[];
  courses: { [key: string]: number };
}

export interface SubjectsResponse {
  [key: string]: Subject;
}
