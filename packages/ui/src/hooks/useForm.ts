import { useState } from "react";

export const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset, setValues };
};
