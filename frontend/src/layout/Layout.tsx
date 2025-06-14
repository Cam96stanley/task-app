import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="bg-[#181818] w-screen h-screen text-white">
      <header className="w-full py-6 px-5 lg:px-64 bg-[#252525] flex justify-between text-neutral-300">
        <Link to="/" className="text-lg font-semibold">
          Taskley
        </Link>

        {isLoggedIn ? (
          <>
            <ul className="hidden md:flex items-center space-x-5">
              <li>About</li>
              <li>Contact</li>
              <li>Service</li>
              <li>Help</li>
            </ul>

            <HamburgerMenu showMenu={showMenu} setShowMenu={setShowMenu} />
          </>
        ) : (
          <div>
            <Link
              className="mr-4 bg-gray-500 px-4 py-2 rounded-2xl transition-transform duration-150 ease-in-out hover:translate-y-1 hover:scale-95 hover:font-semibold"
              to="/signup"
            >
              Sign up
            </Link>
            <Link
              className=" bg-gray-500 px-4 py-2 rounded-2xl transition-transform duration-150 ease-in-out hover:translate-y-1 hover:scale-95 hover:font-semibold"
              to="/login"
            >
              Login
            </Link>
          </div>
        )}
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
