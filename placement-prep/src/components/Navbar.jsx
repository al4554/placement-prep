import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const { dark, setDark } = useTheme();

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-blue-600 font-semibold dark:text-white"
      : "text-gray-900 dark:text-white hover:text-blue-600";

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sticky shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white dark:bg-gray-900 transition-colors ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LEFT - LOGO */}
        <Link to="/" className="font-bold text-xl dark:text-white">
          PlacementPrep
        </Link>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-2xl dark:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>

        {/* CENTER LINKS */}
        <div
          className={`md:flex items-center gap-6 transition-all duration-300 
          ${mobileOpen ? "block mt-4" : "hidden md:flex"}
        `}
        >
          <Link to="/" className={`${isActive("/")} mx-3`}>Home</Link>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-1 dark:text-white hover:text-blue-600"
            >
              Start Preparation
              <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {open && (
              <div className="absolute left-0 mt-3 w-56 bg-white dark:bg-gray-800 
                border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden"
              >
                <Link to="/dsa" onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  DSA Sheet
                </Link>
                <Link to="/core-subjects" onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Core Subjects
                </Link>
                <Link to="/lld" onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  LLD
                </Link>
                <Link to="/hld" onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  HLD
                </Link>
              </div>
            )}
          </div>

          <Link to="/ai-planner" className={isActive("/ai-planner")}>
            AI Planner
          </Link>
          <Link to="/chat" className={isActive("/chat")}>
            Chat Arena
          </Link>
          <Link to="/leaderboard" className={isActive("/leaderboard")}>
            Leaderboard
          </Link>
          <Link to="/analytics" className={isActive("/analytics")}>
            Analytics
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="text-red-600 hover:underline">
              Admin
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="mx-3 px-1 py-1 rounded-lg text-sm dark:text-white 
            hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Auth */}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-600 dark:text-white">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm dark:text-white">
                👋 {user.name} {user.rank && `· Rank #${user.rank}`}
              </span>
              <button
                onClick={logout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
