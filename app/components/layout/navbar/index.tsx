import { DesktopNavbar } from "~/components/layout/navbar/desktop";
import { MobileNavbar } from "~/components/layout/navbar/mobile";
import type { NavItem } from "~/lib/types";

type NavbarLogoProps = Pick<NavItem, "url"> & {
  src: string;
  alt: string;
};

type NavbarMenuItem = NavItem & {
  description?: string;
  icon?: React.ReactNode;
  items?: NavbarMenuItem[];
};

const NAVBAR_LOGO: NavbarLogoProps = {
  url: "/",
  src: "https://tds.media/logo512.png",
  alt: "logo",
};

const NAVBAR_MENU: NavbarMenuItem[] = [{ title: "Home", url: "/" }];

export type NavbarProps = {
  logo: NavbarLogoProps;
  menu: NavbarMenuItem[];
};

export const Navbar = () => {
  return (
    <header className="sticky top-0 mx-auto w-full max-w-6xl px-5 py-3">
      <DesktopNavbar logo={NAVBAR_LOGO} menu={NAVBAR_MENU} />
      <div className="block lg:hidden">
        <MobileNavbar logo={NAVBAR_LOGO} menu={NAVBAR_MENU} />
      </div>
    </header>
  );
};
