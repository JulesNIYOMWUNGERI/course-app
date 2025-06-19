import type { JSX } from "react";
import type { AppMessages } from "../common/localization/types";

export type ViewTypes = {
  id: string;
  title: keyof AppMessages;
  image?: string;
  path: string;
};

export type LanguageOptions = {
  id: string;
  name: string;
  flag: JSX.Element;
};

export type ToastType = 'success' | 'error' | 'info';

export interface ApiResultFormat<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}
