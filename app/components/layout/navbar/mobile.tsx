import { GithubIcon, Menu } from "lucide-react";
import { Link, NavLink } from "react-router";
import type { NavbarProps } from "~/components/layout/navbar";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export const MobileNavbar = ({ logo, menu }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between">
      <NavLink to={logo.url} className="flex items-center gap-2">
        <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
      </NavLink>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <Link to={logo.url} className="flex items-center gap-2">
                <img
                  src={logo.src}
                  className="max-h-8 dark:invert"
                  alt={logo.alt}
                />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-5 px-4">
            {menu.map((item) => (
              <Button asChild variant="outline" key={item.title}>
                <NavLink to={item.url}>{item.title}</NavLink>
              </Button>
            ))}

            <Button asChild variant="secondary">
              <a
                href="https://github.com/Kablan-A/tds-tz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                GitHub Repo
              </a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
