import { GithubIcon } from "lucide-react";
import { Link, NavLink } from "react-router";
import type { NavbarProps } from "~/components/layout/navbar";
import { Button } from "~/components/ui/button";

export const DesktopNavbar = ({ logo, menu }: NavbarProps) => {
  return (
    <nav className="hidden items-center justify-between lg:flex">
      <div className="flex items-center gap-5">
        <Link to={logo.url} className="flex items-center gap-2">
          <img src={logo.src} className="size-12" alt={logo.alt} />
        </Link>
        <ul className="flex items-center">
          {menu.map((item) => (
            <li key={item.title}>
              <Button asChild variant="ghost" size="lg">
                <NavLink to={item.url}>{item.title}</NavLink>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Button asChild variant="secondary" size="lg">
        <a
          href="https://github.com/Kablan-A/solva-test-task"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          GitHub Repo
        </a>
      </Button>
    </nav>
  );
};
