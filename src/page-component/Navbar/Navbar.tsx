import cn from "classnames";
import { Link, useLocation } from "react-router-dom";

import styles from "./Navbar.module.css";

const links = [
  {
    path: "/",
    title: "Список продуктов",
  },
  {
    path: "/add",
    title: "Создать продукт",
  },
];

export function Navbar(): JSX.Element {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <Link
          key={link.title}
          className={cn(styles.link, {
            [styles.activeLink]: location.pathname === link.path,
          })}
          to={`${link.path}`}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
