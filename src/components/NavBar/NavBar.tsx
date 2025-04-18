import { Link } from "react-router-dom";
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
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-800 text-white">
      <div className="nav-brand">
        {/* <Link to="/" className="text-white no-underline text-2xl font-bold">Your Logo</Link> */}
        <span className="">VocabBuilder</span>
      </div>
      <ul className="flex gap-8 list-none m-0 p-0">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="text-white no-underline transition-colors hover:text-gray-300"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <span>{user?.name || "User"}</span>
        <svg width="48px" height="48px">
          <use></use>
        </svg>
        <span></span>
        <svg width="16px" height="16px">
          <use></use>
        </svg>
      </div>
    </nav>
  );
};
