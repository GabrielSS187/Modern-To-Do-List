import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { UseMutationResult } from "react-query";
import { AnimationContainer } from "../../../common/AnimationContainer";

import { WomenSvg } from "../../../assets/svg/WomenSvg";
import { Button } from "../../../common/Button";
import { infoModalFolder } from "../../../data/GeneralInfo";
import { TSignInResponse, TUSer } from "../../../endpoints/types";

interface IProps {
  alterModal: "login" | "register";
  setAlterModal: (params: "login" | "register") => void;
  signInFunction: UseMutationResult<
    AxiosResponse<TSignInResponse, any>,
    any,
    TUSer,
    unknown
  >;
  registerFunction: UseMutationResult<void, any, TUSer, unknown>;
}

type TFormData = {
  userName: string;
  password: string;
  confirme_password?: string;
};

export function LoginAndRegisterModal({
  alterModal,
  setAlterModal,
  signInFunction,
  registerFunction,
}: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    watch,
  } = useForm<TFormData>();
  const watchPassword = watch("password");

  const submit = (data: TFormData) => {
    if (alterModal === "login") {
      signInFunction.mutate({
        userName: data.userName,
        password: data.password,
      });
    }
    if (alterModal === "register") {
      registerFunction.mutate({
        userName: data.userName,
        password: data.password,
      });
    }
  };

  const handleLogin = () => {
      clearErrors();
      setAlterModal("login");
    },
    handleRegister = () => {
      clearErrors();
      setAlterModal("register");
    },
     buttonSubmit = () => {
    if (registerFunction.isLoading || signInFunction.isLoading) {
      return "Loading...";
    }

    return alterModal === "login"
      ? infoModalFolder.loginAndRegisterModal.signIn
      : infoModalFolder.loginAndRegisterModal.register;
    };

  useEffect(() => {
    if (signInFunction.isSuccess || registerFunction.isSuccess) {
      reset({
        userName: "",
        password: "",
        confirme_password: "",
      });
      setAlterModal("login");
    }
  }, [signInFunction.isSuccess, registerFunction.isSuccess]);

  const inputClass = `${alterModal === "register" ? "h-[2rem]" : "h-9"} 
  w-full self-center rounded-sm outline outline-1 p-2 text-sm sm:text-base focus:outline-primary-green`;
  const labelClass = `${alterModal === "register" ? "text-sm" : "text-base"}`;
  const errorClass = "font-montserrat font-normal text-xs mt-1 text-red-500";
  return (
    <AnimationContainer type="reveal">
      <div className="relative flex min-[500px]:justify-center sm:items-center gap-1">
        <WomenSvg className="hidden sm:block w-[7.5rem] h-[7.5rem] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] absolute left-0" />
        <div className="font-montserrat ml-3 sm:w-auto">
          <h2 className="font-semibold text-primary-black text-4xl leading-8 md:leading-9">
            {alterModal === "login"
              ? infoModalFolder.loginAndRegisterModal.signIn
              : infoModalFolder.loginAndRegisterModal.register}
          </h2>
          <h3 className="font-normal text-primary-green text-2xl leading-8">
            {alterModal === "login"
              ? infoModalFolder.loginAndRegisterModal.toAccess
              : infoModalFolder.loginAndRegisterModal.toCreate}
          </h3>
        </div>
      </div>

      <form
        role="form"
        onSubmit={handleSubmit(submit)}
        className={`flex flex-col gap-3 mt-1 font-montserrat font-semibold`}
      >
        <div className="flex flex-col w-[90%] self-center sm:w-[17rem] lg:w-[22rem]">
          <label htmlFor="userName" className={labelClass}>
            {alterModal === "login"
              ? infoModalFolder.loginAndRegisterModal.user
              : infoModalFolder.loginAndRegisterModal.chooseName}
          </label>
          <input
            id="userName"
            {...register("userName", {
              required: true,
              minLength: alterModal === "register" ? 4 : undefined,
              maxLength: alterModal === "register" ? 20 : undefined,
            })}
            type="text"
            className={`${inputClass} ${
              errors.userName && "outline-red-500 focus:outline-red-500"
            }`}
            aria-required
            aria-label="Enter your username here."
            autoComplete="username"
          />
          {errors?.userName?.type === "required" && (
            <p className={errorClass}>
              {infoModalFolder.loginAndRegisterModal.required}
            </p>
          )}
          {errors?.userName?.type === "minLength" && (
            <p className={errorClass}>
              {infoModalFolder.loginAndRegisterModal.min4}
            </p>
          )}
          {errors?.userName?.type === "maxLength" && (
            <p className={errorClass}>
              {infoModalFolder.loginAndRegisterModal.max20}
            </p>
          )}
        </div>

        <div className="flex flex-col self-center w-[90%] sm:w-[17rem] lg:w-[22rem]">
          <label htmlFor="password" className={labelClass}>
            {alterModal === "login"
              ? infoModalFolder.loginAndRegisterModal.password
              : infoModalFolder.loginAndRegisterModal.choosePassword}
          </label>
          <input
            id="password"
            {...register("password", {
              required: true,
              minLength: alterModal === "register" ? 6 : undefined,
              maxLength: alterModal === "register" ? 8 : undefined,
            })}
            type="password"
            aria-required
            className={`${inputClass} ${
              errors.password && "outline-red-500 focus:outline-red-500"
            }`}
            aria-label="Enter your password from here."
            autoComplete="current-password"
          />
          {errors?.password?.type === "required" && (
            <p className={errorClass}>
              {infoModalFolder.loginAndRegisterModal.required}
            </p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className={errorClass}>
              {infoModalFolder.loginAndRegisterModal.min6}
            </p>
          )}
          {errors?.password?.type === "maxLength" && (
            <p className={errorClass}>
              {infoModalFolder.loginAndRegisterModal.max8}
            </p>
          )}
        </div>
        {alterModal !== "login" && (
          <div className="flex flex-col self-center w-[90%] sm:w-[17rem] lg:w-[22rem]">
            <label htmlFor="confirm-password" className={labelClass}>
              {infoModalFolder.loginAndRegisterModal.confirmPassword}
            </label>
            <input
              id="confirm-password"
              {...register("confirme_password", {
                required: alterModal === "register" ? true : false,
                validate: (value) => {
                  return value === watchPassword;
                },
              })}
              type="password"
              aria-required
              className={`${inputClass} ${
                errors.confirme_password &&
                "outline-red-500 focus:outline-red-500"
              }`}
              aria-label="Enter your password from here."
              autoComplete="confirm-password"
            />
            {errors?.confirme_password?.type === "required" && (
              <p className={errorClass}>
                {infoModalFolder.loginAndRegisterModal.required}
              </p>
            )}
            {errors?.confirme_password?.type === "validate" && (
              <p className={errorClass}>
                {infoModalFolder.loginAndRegisterModal.incompatiblePassword}
              </p>
            )}
          </div>
        )}

        <Button
          type="submit"
          text={buttonSubmit()}
          ariaLabel={
            alterModal === "login"
              ? infoModalFolder.loginAndRegisterModal.signIn
              : infoModalFolder.loginAndRegisterModal.register
          }
          title={
            alterModal === "login"
              ? infoModalFolder.loginAndRegisterModal.signIn
              : infoModalFolder.loginAndRegisterModal.register
          }
          width="w-[90%] sm:w-[17rem] self-center lg:w-[22rem]"
          padding={alterModal === "register" ? "p-1.5" : undefined}
          disabled={registerFunction.isLoading || signInFunction.isLoading}
        />
      </form>

      <div className="flex flex-col font-montserrat font-normal text-sm text-center mt-3">
        <p>
          {alterModal === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        {alterModal === "login" && (
          <button
            onClick={handleRegister}
            className="text-blue-600 underline decoration-wavy"
            title={infoModalFolder.loginAndRegisterModal.register}
            aria-label="Register"
          >
            {infoModalFolder.loginAndRegisterModal.register}
          </button>
        )}

        {alterModal === "register" && (
          <button
            onClick={handleLogin}
            className="text-blue-600 underline decoration-wavy"
            title={infoModalFolder.loginAndRegisterModal.login}
            aria-label="Login"
          >
            {infoModalFolder.loginAndRegisterModal.login}
          </button>
        )}
      </div>
    </AnimationContainer>
  );
}
