import { LegacyRef } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectListProps {
  value: string;
  options: Array<Option>;
  name: string;
  label: string;
  register: LegacyRef<HTMLSelectElement>;
}

const SelectList: React.FC<SelectListProps> = ({ value, options, name, label, register }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} ref={register}>
        {options.map((option) => (
          <option
            key={option.value}
            selected={option.value == value ? true : false}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectList;
