import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { Navbar } from "./NavBar/NavBar";
import ProtectedRoute from "./CustomRoute/CustomRoute";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const DictionaryPage = lazy(() => import("../pages/DictionaryPage"));
const RecommendPage = lazy(() => import("../pages/RecommendPage"));
const TrainingPage = lazy(() => import("../pages/TrainingPage"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="bg-[#F8F8F8]">
                <Routes>
                  <Route
                    path="dictionary"
                    element={
                      <ProtectedRoute>
                        <DictionaryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="recommend"
                    element={
                      <ProtectedRoute>
                        <RecommendPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="training"
                    element={
                      <ProtectedRoute>
                        <TrainingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=""
                    element={<Navigate to="dictionary" replace />}
                  />
                </Routes>
              </main>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
