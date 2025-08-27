import { useMemo } from  "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function useSignUpForm() {
  const schema = useMemo(() => yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  }), []);

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors,  },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  return {
    handleSubmit,
    register,
    formErrors,
  }
}

export default useSignUpForm;