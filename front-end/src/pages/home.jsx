import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <Outlet />
      </div>
    </div>
  );
};
