import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import {
  type AppMessages,
  type Language,
  translations,
} from "../common/localization/types";

interface LanguageContextProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: Language) => void;
  t: (key: keyof AppMessages) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = "selectedLanguage";

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    const storedLanguage: string | null =
      localStorage.getItem(LANGUAGE_STORAGE_KEY);

    try {
      return storedLanguage ? JSON.parse(storedLanguage) : "en";
    } catch {
      return "en";
    }
  });

  const contextValues: LanguageContextProps = useMemo(
    () => ({
      selectedLanguage,
      setSelectedLanguage: (newLanguage: Language) => {
        setSelectedLanguage(newLanguage);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify(newLanguage));
      },
      t: (key) => translations[selectedLanguage][key] || key,
    }),
    [selectedLanguage],
  );

  return (
    <LanguageContext.Provider value={contextValues}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
