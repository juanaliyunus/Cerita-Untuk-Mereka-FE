import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Switch,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import LogoBlack from "../assets/Logo Black.png";
import LogoWhite from "../assets/Logo White.png";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Home",
    "Orphanage",
    "About",
    "Sign In",
    "Log Out",
  ];

  useEffect(() => {
    setMounted(true);
    // Simulasi cek login
    setIsLoggedIn(false); 
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <NextNavbar onMenuOpenChange={setIsMenuOpen} position="static">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <img 
              src={theme === "dark" ? LogoWhite : LogoBlack} 
              alt="Logo" 
              className="w-10 h-10" 
            />
            <p className="font-bold text-inherit">Cerita Untuk Mereka</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link 
              href="/" 
              className={({ isActive }) => isActive ? 'text-blue-500' : 'text-foreground'}
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/orphanage" 
              className={({ isActive }) => isActive ? 'text-blue-500' : 'text-foreground'}
            >
              Orphanage
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/about" 
              className={({ isActive }) => isActive ? 'text-blue-500' : 'text-foreground'}
            >
              About
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Switch
              checked={theme === "dark"}
              onChange={e => setTheme(e.target.checked ? "dark" : "light")}
              size="lg"
              color="primary"
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <MoonIcon className={className} />
                ) : (
                  <SunIcon className={className} />
                )
              }
            />
            {isLoggedIn ? (
              <Button as={Link} color="primary" href="#" variant="flat">
                Logout
              </Button>
            ) : (
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign In
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems
            .filter(item => !(isLoggedIn && item === "Sign In") && !(!isLoggedIn && item === "Log Out"))
            .map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                  }
                  className="w-full"
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextNavbar>
    </div>
  );
}

export default Navbar;