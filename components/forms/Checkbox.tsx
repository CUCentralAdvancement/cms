import { LegacyRef } from 'react';

interface CheckboxProps {
  value: boolean;
  name: string;
  label: string;
  register: LegacyRef<HTMLInputElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, name, label, register }) => {
  return (
    <>
      <label htmlFor={name}>
        <input className="mr-2" defaultChecked={value} type="checkbox" name={name} ref={register} />
        {label}
      </label>
    </>
  );
};

export default Checkbox;
