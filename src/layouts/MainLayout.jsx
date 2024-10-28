import { Outlet } from "react-router";
import { Header, Footer } from "../components";
import "../App.scss";
const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default MainLayout;
