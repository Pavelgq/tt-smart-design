import { Outlet } from "react-router-dom";
import { Navbar } from "../page-component/Navbar/Navbar";

export function MainLayout(): JSX.Element {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer>Footer</footer> */}
    </>
  );
}
