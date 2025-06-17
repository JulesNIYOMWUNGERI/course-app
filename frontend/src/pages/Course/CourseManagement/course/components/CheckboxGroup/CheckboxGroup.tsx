import "./CheckboxGroup.css";

interface CheckboxGroupProps {
  options: Array<{ label: string; value: string }>;
  name: string;
}

const CheckboxGroup = ({ options, name }: CheckboxGroupProps) => {
  return (
    <div className="checkbox-container">
      {options.map((option) => (
        <label key={option.value} className="checkbox-option">
          <input
            name={name}
            type="checkbox"
            value={option.value}
            className="checkbox-input"
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
