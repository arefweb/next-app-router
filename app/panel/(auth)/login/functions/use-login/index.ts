import {useMutation} from "@tanstack/react-query";

import {login} from './requests';
import { FormInputTypes } from './types';

function useLogin() {
  const {
    data,
    isPending,
    isError,
    error,
    mutateAsync,
  } = useMutation({
    mutationFn: (formData: FormInputTypes) => login(formData),
  });

  return {
    data,
    isPending,
    isError,
    error,
    mutateAsync,
  }
}

export default useLogin;