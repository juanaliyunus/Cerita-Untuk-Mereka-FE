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
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { useTheme } from "next-themes";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LogoBlack from "../assets/LogoBlack.png";
import LogoWhite from "../assets/LogoWhite.png";
import { AvatarContext } from '../context/AvatarContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { avatar, setAvatar } = useContext(AvatarContext);
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
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  if (!mounted) return null;

  return (
    <div>
    <Helmet>
      <title>Cerita Untuk Mereka</title>
    </Helmet>
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
            <p className="font-bold text-inherit">erita Untuk Mereka</p>
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
          {isLoggedIn && (
            <NavbarItem>
              <Link 
                href="/donatur-orphanageList" 
                className={({ isActive }) => isActive ? 'text-blue-500' : 'text-foreground'}
              >
                Orphanage
              </Link>
            </NavbarItem>
          )}
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
          <NavbarItem>
            {isLoggedIn ? (
              <>
                <Dropdown
                  label={<Avatar alt="User settings" img={avatar} rounded className="border-2 border-white rounded-full bg-white" />}
                  arrowIcon={false}
                  inline
                  className="order-first" 
                >
                  <DropdownItem>
                    <Link href="/donatur-profile">Profile</Link>
                  </DropdownItem>
                 
                  <DropdownItem>
                    <Link href="/" onClick={() => {
                      localStorage.removeItem('token');
                      sessionStorage.removeItem('token');
                      setIsLoggedIn(false);
                    }}>Logout</Link>
                  </DropdownItem>
                </Dropdown>
              </>
            ) : (
              <Button as={Link} color="primary" href="/login" variant="flat">
                Sign In
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems
            .filter(item => isLoggedIn || item !== "Orphanage")
            .map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                  }
                  className="w-full"
                  href={item === "Home" ? "/" : item === "Orphanage" ? "/donatur-orphanageList" : "/about"}
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