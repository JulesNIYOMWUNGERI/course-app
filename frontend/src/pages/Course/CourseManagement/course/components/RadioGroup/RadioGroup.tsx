import "./RadioGroup.css";

interface RadioGroupProps {
  options: Array<{ label: string; value: string }>;
  name: string;
  defaultValue?: string;
}

const RadioGroup = ({ options, name, defaultValue }: RadioGroupProps) => {
  return (
    <>
      {options.map((option) => (
        <label key={option.value} className="radio-option">
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            className="radio-input"
          />
          <span className="radio-custom"></span>
          <span className="radio-label">{option.label}</span>
        </label>
      ))}
    </>
  );
};

export default RadioGroup;
