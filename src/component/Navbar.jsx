import {
  Button,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { useTheme } from "next-themes";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LogoBlack from "../assets/LogoBlack.png";
import LogoWhite from "../assets/LogoWhite.png";
import { AvatarContext } from "../context/AvatarContext";
import axiosInstance from "../lib/axiosInstance";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { avatar, setAvatar } = useContext(AvatarContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "Orphanage", "About"];

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      const decodedToken = jwtDecode(token);
      axiosInstance
        .get(`/donors/user/${decodedToken.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAvatar(response.data.data.avatar);
          console.log(response.data);
          
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Helmet>
        <title>CeritaUntukMereka</title>
      </Helmet>
      <NextNavbar
        onMenuOpenChange={setIsMenuOpen}
        position="fixed"
        className="bg-gradient-to-r from-blue-300 to-teal-400 text-white shadow-lg"
      >
        <NavbarContent className="px-4">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <img
              src={theme === "dark" ? LogoWhite : LogoBlack}
              alt="Logo"
              className="w-10 h-10 "
            />
            <p className="font-bold text-inherit ml-2">CeritaUntukMereka</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6 items-center" justify="center">
          {menuItems
            .filter((item) => isLoggedIn || item !== "Orphanage") // Filter item "Orphanage" jika belum login
            .map((item, index) => (
              <NavbarItem key={index}>
                <Link
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Orphanage"
                      ? "/donatur-orphanageList"
                      : "/about"
                  }
                  className="text-white hover:text-blue-200 transition-colors duration-300"
                >
                  {item}
                </Link>
              </NavbarItem>
            ))}
        </NavbarContent>


        <NavbarContent justify="end" className="space-x-4">
          {isLoggedIn ? (
            <Dropdown
              label={
                <Avatar
                  alt="User settings"
                  img={`http://10.10.102.142:8080/api/v1/avatars/public/${avatar}`}
                  rounded
                />
              }
              arrowIcon={false}
              inline
              className="order-first"
              style={{ zIndex: 1050, position: "relative" }}
            >
              <DropdownItem>
                <Link href="/donatur-profile" className="hover:text-white transition duration-200">
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    sessionStorage.removeItem("token");
                    setIsLoggedIn(false);
                  }}
                  className="hover:text-red-500 transition duration-200"
                >
                  Logout
                </Link>
              </DropdownItem>
            </Dropdown>
          ) : (
            <>
              <Button as={Link} color="primary" href="/login" variant="flat" className="hover:bg-blue-700">
                Login
              </Button>
            </>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems
            .filter((item) => isLoggedIn || item !== "Orphanage")
            .map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full hover:text-blue-500 transition duration-200"
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Orphanage"
                      ? "/donatur-orphanageList"
                      : "/about"
                  }
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
};

export default Navbar;
