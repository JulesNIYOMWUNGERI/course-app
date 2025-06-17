import { EnglishFlag, GermanFlag } from "../components";
import type { LanguageOptions, ViewTypes } from "./types";

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const AUTHENTICATED_USER_ID = "selectedUserId";

export const Languages: LanguageOptions[] = [
  {
    id: "en",
    name: "English",
    flag: <EnglishFlag />,
  },
  {
    id: "de",
    name: "German",
    flag: <GermanFlag />,
  },
];

export const Views: ViewTypes[] = [
  {
    id: "0",
    title: "home",
    path: "/home",
  },
  {
    id: "1",
    title: "courseManagement",
    path: "/course/management",
    image:
      "https://media.istockphoto.com/id/1011792694/photo/elevated-view-of-a-busy-open-plan-office.jpg?s=612x612&w=0&k=20&c=f-bXShoO_CyU0f1uSIDMk1CXj2IgCRqkG3KKOgBua9o=",
  },
  {
    id: "2",
    title: "courseOverview",
    path: "/course/overview",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    id: "3",
    title: "administration",
    path: "/administration",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxPDfLiVh__Rhp4b1j9FTiKur67pK7ECEyzA&s",
  },
];
