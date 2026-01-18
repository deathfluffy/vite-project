import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { toast } from "react-toastify";
import { selectAuthUser } from "../../redux/selectors";
import { logout } from "../../redux/thunks/authThunks";

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/dictionary", label: "Dictionary" },
  { path: "/recommend", label: "Recommend" },
  { path: "/training", label: "Training" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = useAppSelector(selectAuthUser);
  const name = user?.name || "User";

  const handleLogout = async () => {
    if (!user?.id) {
      return toast.error("No user to log out.");
    }
    try {
      const resultAction = await dispatch(logout());
      if (logout.fulfilled.match(resultAction)) {
        setIsNavModalOpen(false);
        toast.success("Logout successful");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(`"An error occurred while logging out:" ${errorMessage}`);
    }
  };

  const hideUserBlock = ["/login", "/register"].includes(location.pathname);

  return (
    <nav className="flex justify-between items-center p-4 sm:p-6 md:px-8 lg:px-12 xl:px-16 bg-white text-white">
      <div className="nav-brand flex items-center">
        <NavLink to="/" className="flex items-center no-underline">
          <svg width="36" height="36" className="mr-2 text-secondary fill-current">
            <use href="/src/icons/icons.svg#icon-craftwork"></use>
          </svg>
          <span className="text-primary font-semibold text-base sm:text-lg md:text-xl">
            VocabBuilder
          </span>
        </NavLink>
      </div>

      {isLoggedIn && !hideUserBlock && (
        <div className="flex flex-row items-center gap-2">
          <span className="text-primary text-sm sm:text-base md:text-lg">{name}</span>
          <svg width="36" height="36" className="fill-secondary">
            <use href="/src/icons/icons.svg#icon-user"></use>
          </svg>

          <button className="cursor-pointer" onClick={() => setIsNavModalOpen(true)}>
            <svg width="32" height="22" className="stroke-black fill-transparent">
              <use href="/src/icons/icons.svg#icon-nav"></use>
            </svg>
          </button>
        </div>
      )}

      {isNavModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div
            className="bg-secondary h-full shadow-lg py-5 px-6 sm:px-8 md:px-10 flex flex-col items-center transform transition-transform duration-300 translate-x-0"
            style={{
              transform: isNavModalOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <div className="flex items-center gap-2 relative">
              <button
                className="absolute top-1/2 left-full -translate-y-1/2 cursor-pointer"
                onClick={() => setIsNavModalOpen(false)}
                aria-label="Close"
              >
                <svg width="32" height="32" className="fill-transparent">
                  <use href="/src/icons/icons.svg#icon-close"></use>
                </svg>
              </button>
              <span className="text-white text-base sm:text-lg">{name}</span>
              <svg width="36" height="36" className="fill-white">
                <use href="/src/icons/icons.svg#icon-user-menu"></use>
              </svg>
            </div>

            <div className="flex justify-center items-center h-full">
              <ul className="flex flex-col gap-4 m-0 p-0">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `no-underline transition-colors active:bg-white px-5 py-3 rounded-2xl text-sm sm:text-base font-medium ${
                          isActive ? "bg-white text-black" : "text-white"
                        }`
                      }
                      onClick={() => setIsNavModalOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}

                <li className="px-6 py-3 rounded-2xl flex flex-row gap-1.5">
                  <span className="text-white text-sm sm:text-base font-medium">
                    Log out
                  </span>
                  <button className="cursor-pointer" onClick={handleLogout}>
                    <svg width="16" height="16" className="stroke-white fill-transparent">
                      <use href="/src/icons/icons.svg#icon-arrow-right"></use>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
