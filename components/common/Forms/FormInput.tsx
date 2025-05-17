import { Input } from "@/components/ui/input";
import { Field, useFormikContext } from "formik";
import React from "react";

interface InputTypes {
  type: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  label?: String;
}

const FormInput = ({ name, type, placeholder, disabled = false, label }: InputTypes) => {
  const { values, handleChange, touched, errors } = useFormikContext<any>();

  return (
    <div className="w-full">
      {label && <p className="font-semibold mb-1 text-left text-sm">{label}</p>}
      <Input className="w-full p-2 rounded-sm border-[1px] border-black" type={type} name={name} value={values[name]} onChange={handleChange(name)} placeholder={placeholder} disabled={disabled} />
      {touched[name] && errors[name] && <p className="mt-2 text-red-500 text-xs font-medium">{errors[name]}</p>}
    </div>
  );
};

export default FormInput;
