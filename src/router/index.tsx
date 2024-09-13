import PublicRoutes from "./public";
import PrivateRoutes from "./private";
import Layout from "@/layouts";
import Loader from "@/components/loader";
import PageNotFound from "@/components/pagenotfound";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "@/pages/auth/login";
import { useState } from "react";
const AppRoutes = () => {
  const [isAuthentic, setIsAuthentic] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={!isAuthentic ? <Login /> : <Navigate to={"/dashboard"} />}
          />

          {isAuthentic && (
            <Route path="/dashboard" element={<Layout />}>
              {PrivateRoutes.map((route) => {
                return (
                  <Route
                    index={route.isIndex}
                    key={route.name}
                    element={route.element}
                    path={route.path}
                  />
                );
              })}
            </Route>
          )}
          {!isAuthentic &&
            PublicRoutes.map((route) => {
              return (
                <Route
                  key={route.name}
                  element={route.element}
                  path={route.path}
                />
              );
            })}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
