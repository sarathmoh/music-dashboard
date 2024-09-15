import Brand from "../../assets/icons/Brand.png";
import Logout from "../../assets/icons/Logout.png";
import { LayoutDashboard, ListMusic } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const SideBar = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <div className="h-full flex flex-col ">
      <div className="p-4 flex-1 flex flex-col items-center ">
        <div className="flex rounded-md mb-6">
          <img className="w-[48px] h-[48px]" src={Brand} />
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `flex flex-col items-center space-x p-2 rounded-md ${
                isActive ? "bg-[#FEDFE1]" : "bg-[#E5E7EB]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard
                  color={isActive ? "#901E75" : "#83858B"}
                  strokeWidth={2.5}
                />
                <span
                  className={isActive ? "text-[#901E75]" : "text-[#83858B]"}
                >
                  Home
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/dashboard/courses"
            className={({ isActive }) =>
              `flex flex-col items-center space-x p-2 rounded-md ${
                isActive ? "bg-[#FEDFE1]" : "bg-[#E5E7EB]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <ListMusic
                  color={isActive ? "#901E75" : "#83858B"}
                  strokeWidth={2.5}
                />
                <span
                  className={isActive ? "text-[#901E75]" : "text-[#83858B]"}
                >
                  Courses
                </span>
              </>
            )}
          </NavLink>
        </nav>
      </div>
      <div className="p-4" onClick={logoutHandler}>
        <div className="flex flex-col items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <img src={Logout} className="w-[24p] h-[24p]" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
