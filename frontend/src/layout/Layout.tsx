import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-[#181818] w-screen h-screen text-white">
      <header className="w-full py-6 px-5 lg:px-64 bg-[#252525] flex justify-between text-neutral-300">
        <span className="text-lg font-semibold">Taskley</span>

        <ul className="hidden md:flex items-center space-x-5">
          <li>About</li>
          <li>Contact</li>
          <li>Service</li>
          <li>Help</li>
        </ul>

        <div className="relative md:hidden">
          <button
            className="space-y-1 group"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </button>

          {showMenu && (
            <ul className="fixed top-16 left-0 w-screen h-screen bg-[#252525] z-50 flex flex-col justify-center items-center space-y-3 text-white">
              <li className="w-full">
                <Link
                  to="/"
                  className="block py-4 text-xl w-full text-center hover:bg-[#202020] cursor-pointer"
                  onClick={() => setShowMenu(false)}
                >
                  Home
                </Link>
              </li>
            </ul>
          )}
        </div>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
