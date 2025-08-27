import { useMemo } from  "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function useLoginForm() {
  const schema = useMemo(() => yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  }), []);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  return {
    control,
    handleSubmit,
    register,
    formErrors,
  }
}

export default useLoginForm;