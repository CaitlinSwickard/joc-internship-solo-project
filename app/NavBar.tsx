"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import classnames from "classnames";

const NavBar = () => {
  // current path to style active link on navbar
  const currentPath = usePathname();

  // links to dynamically map out navbar
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Todos", href: "/todos/list" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <PiPencilSimpleLineBold size="1.6rem" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
