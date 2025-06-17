import type { LanguageOptions } from "../../../utils/types";
import "./LanguageOption.css";

interface LanguageOptionProps extends LanguageOptions {
  isSelected: boolean;
  onChange: (languageId: string) => void;
}

const LanguageOption = ({
  id,
  name,
  flag,
  isSelected,
  onChange,
}: LanguageOptionProps) => {
  return (
    <label>
      <div className="language-card">
        <input
          type="radio"
          name="language"
          value={id}
          checked={isSelected}
          onChange={() => onChange(id)}
        />
        <div className="language-flag">
          <div className="flag-icon">{flag}</div>
          <span>{name}</span>
        </div>
      </div>
    </label>
  );
};

export default LanguageOption;
