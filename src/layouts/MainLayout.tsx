import { Outlet } from "react-router-dom";
import { Navbar } from "../page-component/Navbar";

export const MainLayout = (): JSX.Element => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};
