import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Avatar } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const NavMenus = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function UserHeader() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isHoveredIndex, setIsHoveredIndex] = useState(null);
  const [isMenuItemsOpen, setIsMenuItemsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef();
  const tl = useRef();

  const handleLogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Logout successfully" });
        navigate("/auth/login");
      }
    });
  };

  useGSAP(() => {
    tl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        sidebarRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.4 }
      )
      .reverse();
  });

  useEffect(() => {
    isMenuItemsOpen ? tl.current.play() : tl.current.reverse();
  }, [isMenuItemsOpen]);

  return (
    <nav className="bg-blue-50 py-4 px-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">

        {/* Mobile menu */}
        <button
          className="bg-blue-500 p-2 rounded-xl md:hidden"
          onClick={() => setIsMenuItemsOpen(true)}
        >
          <Menu size={30} className="text-white" />
        </button>

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 z-40 w-[220px] bg-white h-full shadow-lg p-6"
        >
          <div className="flex justify-between mb-6">
            <h2 className="font-bold text-blue-600">Menu</h2>
            <button onClick={() => setIsMenuItemsOpen(false)}>✕</button>
          </div>
          <ul className="space-y-4">
            {NavMenus.map((menu) => (
              <li key={menu.label}>
                <Link
                  to={menu.path}
                  onClick={() => setIsMenuItemsOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-blue-100"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">QuickFix</h1>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6">
          {NavMenus.map((menu, i) => (
            <div
              key={menu.label}
              onMouseEnter={() => setIsHoveredIndex(i)}
              onMouseLeave={() => setIsHoveredIndex(null)}
              className="relative"
            >
              <Link to={menu.path}>{menu.label}</Link>
              <AnimatePresence>
                {isHoveredIndex === i && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </ul>

        {/* Auth Section */}
        <div>
          {!isAuthenticated ? (
            <div className="flex gap-3">
              <Link to="/auth/login" className="text-blue-600 font-medium">
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-blue-500 text-white px-4 py-1 rounded-lg"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button>
                  <Avatar className="bg-blue-500 w-10 h-10 flex items-center justify-center text-white font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 mt-2">
                <DropdownMenuLabel>
                  Logged in as {user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/user/account")}>
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;
