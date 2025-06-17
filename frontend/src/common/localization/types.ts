import de from "./locales/de.json";
import en from "./locales/en.json";

export type AppMessages = typeof en;

export const translations: { [P in string]: AppMessages } = { en, de } as const;

type Translations = typeof translations;
export type Language = keyof Translations;
