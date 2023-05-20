import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../context";
import Loader from "./Loader";
import LOGO from "./../assets/logo.png";
const Layout = () => {
  const { isLoading } = useContext(AppContext);
  return (
    <div className="mx-auto max-w-md h-full flex flex-col appContainer py-2">
      <img src={LOGO} alt="logo" className="h-20 mx-auto" />

      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
};
export default Layout;
