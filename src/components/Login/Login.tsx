import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../redux/thunks/authThunks";
import { loginSchema } from "../../utils/schems";


type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const resultAction = await dispatch(
        login({ email: data.email, password: data.password })
      );
      if (login.fulfilled.match(resultAction)) {
        toast.success("Login successful!");
        navigate("/dictionary");
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(`"Login failed", ${errorMessage}`);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex flex-col items-center">
          <img
            src="/src/img/vocab.jpg"
            alt="Vocabulary Builder"
            className="w-[247px] h-[191px] mb-[42px]"
          />
          <p></p>
        </div>

        <div className="max-w-md w-full h-[475px] space-y-8 pt-[32px] pr-[16px] pl-[16px] pb-[16px] bg-grey-background rounded-lg shadow rounded-s-3xl flex flex-col items-start justify-items-center">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-primary mb-4 font-fixel">
            Login
          </h2>
          <p className="text-grey-text mb-10 leading-6 tracking-tight text-sm md:text-base">
            Please enter your login details to continue using our service:
          </p>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="-space-y-px mb-4">
              <input
                type="email"
                {...register("email")}
                autoComplete="email"
                required
                className="
      rounded-2xl relative block w-full
      pt-[16px] pb-[16px] pl-[18px]
      border-grey-border border outline-none
      focus:ring-0 focus:border-secondary hover:border-secondary
      transition-colors
      placeholder:mb-10 placeholder:leading-6
      placeholder:tracking-tight placeholder:text-sm md:placeholder:text-base
    "
                placeholder="Email address"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-8">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password")}
                  required
                  className="
        rounded-2xl block w-full
        pt-[16px] pb-[16px] pl-[18px]
        border-grey-border border outline-none
        focus:ring-0 focus:border-secondary hover:border-secondary
        transition-colors
        placeholder:leading-6 placeholder:tracking-tight
        placeholder:text-sm md:placeholder:text-base
      "
                  placeholder="Password"
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  <svg
                    width="20"
                    height="20"
                    className="stroke-[#121417] fill-transparent"
                  >
                    <use
                      href={`/src/icons/icons.svg#icon-eye${
                        showPassword ? "-off" : ""
                      }`}
                    ></use>
                  </svg>
                </button>
              </div>

              {errors.password && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="py-4 px-10 text-sm font-bold rounded-4xl text-white bg-secondary w-full hover:bg-white-hover"
              >
                {isSubmitting ? "Logging in…" : "Login"}
              </button>
              <div className="text-center mt-4">
                <span className="text-sm text-grey-text">New here? </span>
                <Link
                  to="/register"
                  className="text-sm text-secondary hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
