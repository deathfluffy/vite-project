import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.info("Please fill in all fields.");
      return null;
    }  

    try {
    const resultAction = await dispatch(login({ email, password }));    
    if (login.fulfilled.match(resultAction)) {
      toast.success("Successful login!");
      navigate('/dictionary');
    } 
    } catch (e: string | unknown) {
      console.error('Login failed:', e);
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
      <div className="flex flex-col mt-[18px]">
        <div className="flex flex-col items-center">
          <img
            src="/src/img/vocab.jpg"
            alt="Vocabulary Builder"
            className="w-[247px] h-[191px] mb-[16px]"
          />
          <div className="text-center text-gray-500 mb-[48px]">
            <ul className="flex flex-row gap-3 ">
              <li>
                <span>Word</span> &middot;
              </li>
              <li>
                <span>Translation</span> &middot;
              </li>
              <li>
                <span>Grammar</span> &middot;
              </li>
              <li>
                <span>Progress</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-md w-full space-y-8 pt-[32px] pr-[16px] pl-[16px] pb-[22px] bg-grey-background rounded-lg shadow rounded-s-3xl flex flex-col items-start">
          <h2 className="text-center text-3xl font-semibold text-primary mb-[16px] font-fixel">
            Login
          </h2>
          <p className="text-grey-text mb-[40px] leading-[1.5rem] tracking-[-0,6px]">
            Please enter your login details to continue using our service:
          </p>
          <form className="w-full">
            <div className="-space-y-px mb-[14px]">
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl relative block w-full pt-[16px] pb-[16px] pl-[18px] border-grey-border border outline-none focus:ring-0 focus:border-secondary hover:border-secondary transition-colors"
                placeholder="Email address"
              />
            </div>
            <div className="mb-[32px] relative">
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-2xl relative block w-full pt-[16px] pb-[16px] pl-[18px] border-grey-border border outline-none focus:ring-0 focus:border-secondary hover:border-secondary transition-colors"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-[18px] top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)} 
              tabIndex={-1}
            >
              <svg width="20" height="20" className="stroke-[#121417] fill-transparent">
                <use href={`/src/icons/icons.svg#icon-eye${showPassword ? "-off" : ""}`}></use>
              </svg>
            </button>
          </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="py-[16px] px-[150px] text-sm font-bold rounded-4xl text-white bg-secondary w-full hover:bg-white-hover"
              >
                Login
              </button>
              <div className="text-center mt-[16px]">
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
    </div>
  );
};
