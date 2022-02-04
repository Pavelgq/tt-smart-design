import { Link, useLocation } from "react-router-dom";

const links = [
  {
    path: "",
    title: "Список продуктов",
  },
  {
    path: "add",
    title: "Создать продукт",
  },
];

export const Navbar = (): JSX.Element => {
  const location = useLocation();

  return (
    <nav>
      {links.map((link) => (
        <Link
          key={link.title}
          to={`/${link.path}`}
          defaultChecked={location.pathname == link.path}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};
