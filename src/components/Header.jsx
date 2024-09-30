/* eslint-disable no-unused-vars */
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const { user, isSignedIn } = useUser();
  let classes =
    "font-medium  transition-all hover:text-primary hover:cursor-pointer hover:scale-105";
  return (
    <header className="flex justify-between items-center shadow-sm p-5">
      <div className="flex items-center justify-center gap-2 font-extrabold text-2xl">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img src="/logo.svg" alt="logo" />
          <h2>CarTrek</h2>
        </Link>
      </div>
      <nav>
        <ul className="hidden md:flex gap-16">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes} text-primary` : classes
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? `${classes} text-primary` : classes
              }
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                isActive ? `${classes} text-primary` : classes
              }
            >
              New
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/used"
              className={({ isActive }) =>
                isActive ? `${classes} text-primary` : classes
              }
            >
              Used
            </NavLink>
          </li>
        </ul>
      </nav>
      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Link to="/profile">
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal" forceRedirectUrl="/">
          <Button>Submit Listing</Button>
        </SignInButton>
      )}
    </header>
  );
}
