export type Classification = "all" | "technical" | "business" | "softSkills";
export type Department = "all" | "java" | ".net" | "sap";

export interface Course {
  id: string;
  name: string;
  department: Department;
  classification: Classification;
  participantGroups: string[];
  numberOfParticipants: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface Participant {
  id: string;
  userId: string;
  name: string;
  courseId: string;
}
