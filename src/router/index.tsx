import PublicRoutes from "./public";
import PrivateRoutes from "./private";
import Layout from "@/layouts";
import Loader from "@/components/loader";
import PageNotFound from "@/components/pagenotfound";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/login";
const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {
            <Route path="/dashboard" element={<Layout/>}>
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
          }
          {PublicRoutes.map((route) => {
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
