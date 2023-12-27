import { Outlet } from "react-router-dom";
import { useAuth } from "./components/context/auth";
import Login from "./Login";
const PrivateRoute = () => {
  const [auth] = useAuth();

  const isLoggedIn = auth;
  let l = localStorage.getItem("auth");

  if (l != null) {
    l = true;
  } else l = false;

  return isLoggedIn && l ? (
    <Outlet />
  ) : (
    <>
      <Login />
    </>
  );
};
export default PrivateRoute;
