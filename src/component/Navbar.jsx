import {
    Button,
    Link,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Navbar as NextNavbar
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import LogoBlack from "../assets/Logo Black.png";
import LogoWhite from "../assets/Logo White.png";
import SwicthTheme from "./SwicthTheme";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Home",
    "Orphanage",
    "About"
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
            <SwicthTheme />
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