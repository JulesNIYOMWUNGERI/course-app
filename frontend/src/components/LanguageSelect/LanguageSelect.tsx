import "./LanguageSelect.css";
import { LanguageOption } from "..";
import type { Language } from "../../common/localization/types";
import { useLanguage } from "../../contexts/LanguageProviderContext";
import type { LanguageOptions } from "../../utils/types";
import { Languages } from "../../utils/utils";

const LanguageSelect = () => {
  const { t } = useLanguage();

  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  const handleLanguageChange = (languageId: Language) => {
    setSelectedLanguage(languageId);
  };

  return (
    <div className="language-container">
      <span className="title">{t("language")}</span>
      <div className="language-box">
        {Languages.map((language: LanguageOptions) => (
          <LanguageOption
            key={language.id}
            id={language.id}
            name={language.name}
            flag={language.flag}
            isSelected={language.id === selectedLanguage}
            onChange={handleLanguageChange}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
