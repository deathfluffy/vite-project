import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
  const { user } = useAuth();
  return (
    <header>
      <nav className="flex justify-between items-center px-8 py-4 bg-[#FFF] text-white">
        <div className="nav-brand flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2 no-underline">
            <svg width="36px" height="36px" className="mr-2 text-secondary fill-current">
              <use href="/src/icons/icons.svg#icon-craftwork"></use>
            </svg>
            <span className="text-black font-semibold text-[22px]">VocabBuilder</span>
          </NavLink>
        </div>
        <ul className="flex gap-8 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `no-underline transition-colors hover:text-secondary active:text-secondary pr-[20px] pl-[20px] pt-[12px] pb-[12px] text-[14px] rounded-2xl ${
                    isActive ? "bg-secondary text-white" : "text-black"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
          <div className="flex items-center gap-2">
            <svg width="48px" height="48px" className="text-secondary fill-current">
              <use href="/src/icons/icons.svg#icon-user"></use>
            </svg>
            <span className="text-primary font-medium text-[22px]">{user?.name || "User"}</span>
            <svg width="16px" height="16px" className="ml-2 fill-transparent stroke-[#121417]">
              <use href="/src/icons/icons.svg#icon-arrow-right"></use>
            </svg>
          </div>
      </nav>
    </header>
  );
};
