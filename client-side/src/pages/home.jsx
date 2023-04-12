import { Outlet } from "react-router-dom";
import { Heroes } from "../components/heroes";
import { Navbar } from "../components/navbar";
import { EventForm } from "../components/eventForm";
import { Events } from "../components/events";
import { useSelector } from 'react-redux';

export const HomePage = () => {
  const userData = useSelector((state) => state.user.value);

  return (
    <div>
      <Navbar />
      {userData? (
        <>
          {userData.isAdmin? <EventForm /> : <></>}
          <Events />
        </>
      ) : <Heroes />}
      <Outlet />
    </div>
  );
};
