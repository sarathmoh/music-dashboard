import { lazy } from "react";

const Home = lazy(() => import("@/pages/dashboard/home"));
const Courses = lazy(() => import("@/pages/dashboard/courses"));
const PrivateRoutes = [
  {
    path: "",
    name: "home",
    element: <Home />,
    isIndex: true,
  },
  {
    path: "courses",
    name: "courses",
    element: <Courses />,
  },
];

export default PrivateRoutes;
