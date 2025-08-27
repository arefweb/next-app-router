'use client';

import React, {useCallback} from "react";
import Link from "next/link";

import useSignUp from "./functions/use-sign-up";
import { FormInputTypes } from "./functions/use-sign-up/types";
import useSignUpForm from "./functions/use-sign-up-form";

function SignUp() {
  const {
    handleSubmit,
    register,
    formErrors,
  } = useSignUpForm();
  const {
    mutate,
  } = useSignUp();

  const onSubmit = useCallback((formData: FormInputTypes) => {
    mutate(formData)
  }, [mutate]);

  return (
    <div className="flex justify-center items-center grow shrink-0 basis-[100vh]">
      <div className="bg-white rounded-lg shadow-lg p-4 w-1/3">
        <h3 className="text-md font-bold mb-2 ">Signup Form</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-x-4 gap-y-4"
        >
          <input
            type="text"
            {...register("name")}
            placeholder="Full Name"
            className="border border-gray-300 rounded-md p-2"
          />
          {formErrors.name && (
            <span className="text-red-500">
              {formErrors.name.message}
            </span>
          )}
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
          <button
            type="submit"
            className="border border-gray-400 rounded-md p-2
            cursor-pointer bg-green-400 hover:bg-green-500 text-white"
          >
            Signup
          </button>
        </form>
        <div className="pt-4 pb-0 flex gap-1">
          <p>Already have an account?</p>
          <Link
            href="/panel/login"
            className="text-blue-500 hover:text-blue-500"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp;