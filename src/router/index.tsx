import PublicRoutes from "./public";
import PrivateRoutes from "./private";
import Layout from "@/layouts";
import Loader from "@/components/loader";
import PageNotFound from "@/components/pagenotfound";
import { Suspense } from "react";
import { useAuth } from "@/context/authContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "@/pages/auth/login";
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? <Login /> : <Navigate to={"/dashboard"} />
            }
          />

          {isAuthenticated && (
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
          {!isAuthenticated &&
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
