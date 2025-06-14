import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface HamburgerMenuProps {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HamburgerMenu({
  setShowMenu,
  showMenu,
}: HamburgerMenuProps) {
  const { user, logout } = useAuth();

  return (
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
          <li className="w-full">
            <Link
              className="block py-4 text-xl w-full text-center hover:bg-[#202020] cursor-pointer"
              to="/"
              onClick={() => {
                logout();
                setShowMenu(false);
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
