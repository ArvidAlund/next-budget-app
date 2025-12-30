"use client"

import UserSession from "@/app/lib/userSession";
import LoggedInNavbar from "./logedin";
import { useState, useEffect } from "react";
import LoggedOutNavbar from "./loggedout";



const NavbarHeight = 64; // Höjd i pixlar för navbaren



function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Kontrollera om användaren är inloggad
    const checkUserSession = async () => {
      const res = await UserSession();
      setLoggedIn(res);
    };
    checkUserSession();
  }, []);

  return (
    <>
      {loggedIn ? (
        <LoggedInNavbar NavbarHeight={NavbarHeight} />
      ) : (
        <LoggedOutNavbar NavbarHeight={NavbarHeight} />
      )}
    </>
  );
}

export { Navbar, NavbarHeight };