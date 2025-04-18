import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !name.trim()) {
      alert("Please fill in all fields.");
      return;
    }

  try {
    const resultAction = await dispatch(register({ email, password, name }));
    if (register.fulfilled.match(resultAction)) {
      alert("Registration successful! You have to check email to verify your account.");
      navigate("/verify");
    }  
    } catch (e: string | unknown) {
      alert(e || "Registration failed");
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
        <h2 className="text-center text-3xl font-semibold text-primary mb-[16px] font-fixel">
          Register
        </h2>
        <p className="text-grey-text mb-[40px] leading-[1.5rem] tracking-[-0,6px]">
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
        <form className="w-full">
          <div className="mb-[14px]">
            <input
              type="text"
              name="name"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-2xl relative block w-full pt-[16px] pb-[16px] pl-[18px] border-grey-border border outline-none focus:ring-0 focus:border-secondary hover:border-secondary transition-colors"
              placeholder="Name"
            />
          </div>
          <div className="mb-[14px]">
            <input
              type="email"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-2xl relative block w-full pt-[16px] pb-[16px] pl-[18px] border-grey-border border outline-none focus:ring-0 focus:border-secondary hover:border-secondary transition-colors"
              placeholder="Email address"
            />
          </div>
          <div className="mb-[32px] relative">
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-2xl relative block w-full pt-[16px] pb-[16px] pl-[18px] border-grey-border border outline-none focus:ring-0 focus:border-secondary hover:border-secondary transition-colors"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-[18px] top-1/2 transform -translate-y-1/2"
            >
              <svg width="20" height="20">
                <use href="/icons/icons.svg#icon-eye"></use>
              </svg>
            </button>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="py-[16px] px-[150px] text-sm font-bold rounded-4xl text-white bg-secondary w-full hover:bg-white-hover"
          >
            Register
          </button>
          <div className="text-center mt-[16px]">
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
