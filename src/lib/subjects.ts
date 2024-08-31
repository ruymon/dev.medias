import { SubjectsResponse } from "@/types/subjects";

export async function getAllSubjects(): Promise<SubjectsResponse> {
  const url = "https://d2aa4b9d9pswiy.cloudfront.net/allSubjects.json";

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 60 * 24 * 7, // 1 week in seconds
      tags: ["subjects"],
    },
  };

  const result = await fetch(url, options);
  const data = await result.json();

  if (!result.ok) {
    throw new Error("Error fetching subjects:", data);
  }

  return data;
}
