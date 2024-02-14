import Link from "next/link";
import { PiPencilSimpleLineBold } from "react-icons/pi";

const NavBar = () => {

  // links to dynamically map out navbar
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Todos", href: "/" },
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
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
