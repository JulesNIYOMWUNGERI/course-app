import React from "react";

export type Classification = "all" | "technical" | "business" | "softSkills";
export type Department = "all" | "java" | ".net" | "sap";

export interface Course {
  id: string;
  name: string;
  department: Department;
  classification: Classification;
  participantsGroup: string[];
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

export interface BaseItem {
  id: string;
  name: string;
}

export interface ActionButton<T> {
  icon: React.ReactNode;
  label: string;
  onClick: (item: T) => void;
  variant?: string;
}

export interface ItemListProps<T> {
  sectionTitle?: string;
  items: T[];
  actions: ActionButton<T>[];
  emptyMessage?: string;
  renderItemName?: (item: T) => React.ReactNode;
}
