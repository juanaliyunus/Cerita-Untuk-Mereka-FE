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
import axiosInstance from "../lib/axiosInstance";
import { jwtDecode } from "jwt-decode";

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
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      const decodedToken = jwtDecode(token);
      axiosInstance.get(`/donors/${decodedToken.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setAvatar(response.data.data.avatar);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Helmet>
        <title>Cerita Untuk Mereka</title>
      </Helmet>
      <NextNavbar onMenuOpenChange={setIsMenuOpen} position="fixed" className="bg-[#6fccd8] text-white">
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
            <p className="font-bold text-inherit ml-2">Cerita Untuk Mereka</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6 items-center" justify="center">
          <NavbarItem>
            <Link 
              href="/" 
              className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}
            >
              Home
            </Link>
          </NavbarItem>
          {isLoggedIn && (
            <NavbarItem>
              <Link 
                href="/donatur-orphanageList" 
                className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}
              >
                Orphanage
              </Link>
            </NavbarItem>
          )}
          <NavbarItem>
            <Link 
              href="/about" 
              className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}
            >
              About
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="space-x-4">
          {isLoggedIn ? (
            <>
              <Dropdown
                label={<Avatar alt="User settings" img={`http://10.10.102.142:8080/api/v1/avatars/public/${avatar}`} rounded className="border-2 border-white rounded-full bg-white" />}
                arrowIcon={false}
                inline
                className="order-first"
                style={{ zIndex: 1050, position: 'relative' }}
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
            <>
              <Button as={Link} color="primary" href="/login" variant="flat">
                Sign In
              </Button>
              <Button as={Link} color="secondary" href="/register" variant="flat">
                Register
              </Button>
            </>
          )}
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
