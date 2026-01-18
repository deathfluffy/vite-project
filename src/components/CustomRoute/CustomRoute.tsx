import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectAuthToken } from "../../redux/selectors";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const tokenFromRedux = useAppSelector(selectAuthToken);
  const token = tokenFromRedux || localStorage.getItem("token"); 
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (!token || !isAuthenticated) {
          if (location.pathname !== "/login") {
            navigate("/login", { replace: true });
          }
          return;
        }

        const decoded: DecodedToken = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("token");
          if (location.pathname !== "/login") {
            navigate("/login", { replace: true });
          }
          return;
        }
        setChecking(false);
      } catch {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      }
    };

    checkAuth();
  }, [token, isAuthenticated, navigate, location.pathname]);

  if (checking) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
