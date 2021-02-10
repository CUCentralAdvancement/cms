import { LegacyRef } from 'react';

interface TextInputProps {
  value: string;
  name: string;
  label: string;
  register: LegacyRef<HTMLInputElement>;
}

const TextInput: React.FC<TextInputProps> = ({ value, name, label, register }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input defaultValue={value} name={name} type="text" ref={register} spellCheck />
    </>
  );
};

export default TextInput;
