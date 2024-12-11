import { useState } from 'react';

type ParamsT<T> = {
  initialValues: T;
};

export const useForm = <T extends {}>({ initialValues }: ParamsT<T>) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = '';
      return acc;
    }, {} as Record<keyof T, string>),
  );

  const handleOnChangeValue = (key: keyof T, value: string) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const resetErrors = () => {
    setErrors(prevErrors =>
      Object.keys(prevErrors).reduce((acc, key) => {
        acc[key as keyof T] = '';
        return acc;
      }, {} as Record<keyof T, string>),
    );
  };

  return {
    formValues,
    errors,
    setErrors,
    resetErrors,
    onChangeValue: handleOnChangeValue,
  };
};
