import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import { Navbar } from "./NavBar/NavBar";
import { lazy } from "react";
// import ProtectedRoute from "./CustomRoute/CustomRoute";


// const DictionaryPage = lazy(() => import("../pages/DictionaryPage"));
// const RecommendPage = lazy(() => import("../pages/RecommendPage"));
// const TrainingPage = lazy(() => import("../pages/TrainingPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      {/* <header className="app">
        <Navbar />
        <Routes>
          <Route
            path="/dictionary"
            element={
              <ProtectedRoute>
                <DictionaryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommend"
            element={
              <ProtectedRoute>
                <RecommendPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training"
            element={
              <ProtectedRoute>
                <TrainingPage />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dictionary" replace />} />
        </Routes>
      </header> */}
    </Router>
  );
}

export default App;
