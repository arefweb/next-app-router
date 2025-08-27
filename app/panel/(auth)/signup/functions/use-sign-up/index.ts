import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

import { signUp } from './requests';
import { FormInputTypes } from './types';

function useSignUp() {
  const router = useRouter();
  const {
    data,
    isError,
    isPending,
    mutate,
  } = useMutation({
    mutationFn: (formData: FormInputTypes) => signUp(formData),
    onSuccess: (resp) => {
      localStorage.setItem('userId', resp.data.id);
      router.push('/panel/my-desk');
    },
  });

  return {
    data,
    isError,
    isPending,
    mutate,
  }
}

export default useSignUp;