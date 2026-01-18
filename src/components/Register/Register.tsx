import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { register as registerFunction } from "../../redux/thunks/authThunks";
import { registerSchema } from "../../utils/schems";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const resultAction = await dispatch(
        registerFunction({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );

      if (registerFunction.fulfilled.match(resultAction)) {
        toast.success(
          "Register successful! Check your email for verification."
        );
        navigate("/login");
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(`"Register failed", "${errorMessage}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="w-full flex items-center justify-start p-[16px]">
        <svg width="36px" height="36px" className="mr-[16px]">
          <use href="/src/icons/icons.svg#icon-craftwork"></use>
        </svg>
        <h1 className="text-xl font-bold text-primary">VocabBuilder</h1>
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/src/img/vocab.jpg"
          alt="Vocabulary Builder"
          className="w-[247px] h-[191px] mb-[42px]"
        />
      </div>
      <div className="max-w-md w-full space-y-8 pt-[32px] pr-[16px] pl-[16px] pb-[16px] bg-grey-background rounded-lg shadow rounded-s-3xl flex flex-col items-start">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-primary mb-4 font-fixel">
          Register
        </h2>
        <p className="text-grey-text mb-10 leading-6 tracking-tight text-sm md:text-base">
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[14px]">
            <input
              type="text"
              autoComplete="name"
              {...register("name")}
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
              placeholder="Name"
            />
            {errors.name && <span>{errors.name?.message}</span>}
          </div>
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
          <button
            disabled={isSubmitting}
            type="submit"
            className="py-4 px-10 text-sm font-bold rounded-4xl text-white bg-secondary w-full hover:bg-white-hover"
          >
            {isSubmitting ? "Logging in…" : "Login"}
          </button>
          <div className="text-center mt-4">
            <span className="text-sm text-grey-text">Have an account? </span>
            <Link
              to="/login"
              className="text-sm text-secondary hover:underline"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
