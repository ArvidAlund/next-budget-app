"use client"

import UserSession from "@/app/lib/userSession";
import LoggedInNavbar from "./logedin";
import { useState, useEffect } from "react";
import LoggedOutNavbar from "./loggedout";



const NavbarHeight = 64; /**
 * Top-level navigation component that renders the appropriate navbar based on the current user session.
 *
 * The component checks the user's session on mount and renders the logged-in variant when a session exists,
 * otherwise it renders the logged-out variant. It passes the shared `NavbarHeight` to the rendered navbar.
 *
 * @returns A React element rendering either the logged-in or logged-out navbar
 */



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