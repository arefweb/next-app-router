'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from "next/navigation";
import {useAppDispatch} from "@/shared/services/store";
import { setUserId } from '@/shared/services/store/slices/userInfoSlice';

import useLogin from "./functions/use-login";
import { FormInputTypes } from './functions/use-login/types';
import useLoginForm from "./functions/use-login-form";

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/panel/my-desk";
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formErrors,
  } = useLoginForm();

  const {
    mutateAsync,
    isPending,
    isError,
    error,
  } = useLogin();

  function onSubmit(formData: FormInputTypes) {
    mutateAsync(formData).then((data) => {
      localStorage.setItem('userId', `${data.id}`);
      dispatch(setUserId(data.id));
      router.replace(redirectUrl);
    })
  }

  return (
    <div className="flex justify-center items-center grow shrink-0 basis-[100vh]">
      <div className="bg-white rounded-lg shadow-lg p-4 w-1/3">
        <h3 className="text-md font-bold mb-2 ">Login Form</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-x-4 gap-y-4"
        >
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="border border-gray-300 rounded-md p-2"
          />
          {formErrors.email && (
            <span className="text-red-500">
              {formErrors.email.message}
            </span>
          )}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2"
          />
          {formErrors.password && (
            <span className="text-red-500">
              {formErrors.password.message}
            </span>
          )}
          {isError && (
            <span className="text-red-500">
              {error ? error.message : 'Something went wrong'}
            </span>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="border border-gray-400 rounded-md p-2
            cursor-pointer bg-green-400 hover:bg-green-500 text-white"
          >
            {isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className="pt-4 pb-0 flex gap-1">
          <p>Dont&lsquo;t have an account?</p>
          <Link
            href="/panel/signup"
            className="text-blue-500 hover:text-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;