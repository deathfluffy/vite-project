import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./CustomRoute/CustomRoute";
import Layout from "./Layout/Layout";
import Loader from "./Loader/Loader";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const DictionaryPage = lazy(() => import("../pages/DictionaryPage"));
const RecommendPage = lazy(() => import("../pages/RecommendPage"));
const TrainingPage = lazy(() => import("../pages/TrainingPage"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/login"
            element={
              <Layout>
                {" "}
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                {" "}
                <RegisterPage />
              </Layout>
            }
          />
          <Route
            path="dictionary"
            element={
              <Layout>
                <ProtectedRoute>
                  <DictionaryPage />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="recommend"
            element={
              <Layout>
                <ProtectedRoute>
                  <RecommendPage />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="training"
            element={
              <Layout>
                <ProtectedRoute>
                  <TrainingPage />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route path="" element={<Navigate to="dictionary" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
