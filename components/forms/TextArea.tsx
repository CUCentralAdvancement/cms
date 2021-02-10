import { LegacyRef } from 'react';

interface TextAreaProps {
  value: string;
  name: string;
  label: string;
  register: LegacyRef<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaProps> = ({ value, name, label, register }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} defaultValue={value} ref={register}></textarea>
    </>
  );
};

export default TextArea;
