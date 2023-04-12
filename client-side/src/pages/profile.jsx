import { Outlet } from "react-router-dom";
import { Biodata } from "../components/biodata";
import { Navbar } from "../components/navbar";
import { ErrorPage } from "./error"

export const ProfilePage = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token? (
        <>
          <Navbar />
          <Biodata />
          <Outlet />
        </>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
