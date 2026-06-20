import React, { useState } from "react";

import {
  Moon,
  Sun,
  BookOpen,
  Search,
  Menu,
  X
} from "lucide-react";

import {
  useTheme
} from "../../context/ThemeContext";

import {
  Link,
  Outlet,
  useLocation
} from "react-router";

export function Layout() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const location =
    useLocation();

  const toggleMenu = () =>
    setIsMobileMenuOpen(
      !isMobileMenuOpen
    );

  const token =
    localStorage.getItem(
      "token"
    );

  const {

    darkMode,

    toggleDarkMode

  } = useTheme();

  const navLinks = [

    {
      name: "Home",
      path: "/"
    },

    {
      name: "Branches",
      path: "/#branches"
    },

    {
      name: "Bookmarks",
      path: "/bookmarks"
    },

    {
      name: "About",
      path: "/about"
    }
  ];

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col font-sans text-gray-900 dark:text-white transition-all duration-300">

      {/* Navbar */}

      <nav className="bg-gradient-to-r from-gray-900 to-green-800 dark:from-black dark:to-slate-900 text-white shadow-lg sticky top-0 z-50 transition-all duration-300">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            {/* Logo */}

            <div className="flex-shrink-0 flex items-center gap-2">

              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-green-300 transition-colors"
              >

                <BookOpen className="h-6 w-6 text-green-400" />

                <span>Engg-Gram</span>

              </Link>

            </div>

            {/* Desktop Menu */}

            <div className="hidden md:flex items-center space-x-6">

              {navLinks.map((link) => (

                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium hover:text-green-300 transition-colors ${location.pathname === link.path

                      ? "text-green-400 border-b-2 border-green-400 pb-1"

                      : "text-gray-100"
                    }`}
                >

                  {link.name}

                </Link>
              ))}

              {/* Dark Mode Button */}

              <button

                onClick={toggleDarkMode}

                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
              >

                {darkMode ? (

                  <Sun className="h-5 w-5" />

                ) : (

                  <Moon className="h-5 w-5" />

                )}

              </button>

            </div>

            {/* Search Bar */}

            <div className="hidden md:flex items-center">

              <div className="relative rounded-full bg-white/10 backdrop-blur-sm p-1 flex items-center border border-white/20 hover:border-green-400/50 transition-colors">

                <input
                  type="text"
                  placeholder="Search notes..."
                  className="bg-transparent border-none text-white text-sm px-4 py-1.5 focus:outline-none w-48 lg:w-64 placeholder-gray-300"
                />

                <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5 ml-1 transition-colors flex items-center justify-center">

                  <Search className="h-4 w-4" />

                </button>

              </div>

            </div>

            {/* Mobile Menu Button */}

            <div className="md:hidden flex items-center gap-3">

              {/* Mobile Dark Mode */}

              <button

                onClick={toggleDarkMode}

                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
              >

                {darkMode ? (

                  <Sun className="h-5 w-5" />

                ) : (

                  <Moon className="h-5 w-5" />

                )}

              </button>

              {/* Mobile Menu */}

              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white"
              >

                {isMobileMenuOpen

                  ? <X className="h-6 w-6" />

                  : <Menu className="h-6 w-6" />
                }

              </button>

            </div>

          </div>

        </div>

        {/* Mobile Menu */}

        {isMobileMenuOpen && (

          <div className="md:hidden bg-gray-800 dark:bg-black border-t border-gray-700 pb-4">

            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

              {navLinks.map((link) => (

                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }

                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:text-white hover:bg-gray-700"
                >

                  {link.name}

                </Link>
              ))}

              {/* Mobile Admin */}

              {token ? (

                <Link
                  to="/admin/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white"
                >

                  Dashboard

                </Link>

              ) : (

                <Link
                  to="/admin/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-black text-white"
                >

                  Admin Login

                </Link>
              )}

            </div>

          </div>
        )}

      </nav>

      {/* Main Content */}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Outlet />

      </main>

      {/* Footer */}

      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-8 border-t border-gray-800 transition-all duration-300">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-2">

            <BookOpen className="h-5 w-5 text-green-500" />

            <span className="text-gray-200 font-semibold">

              Engg-Gram

            </span>

          </div>

          <p className="text-sm">

            © 2026 Engg-Gram. All rights reserved.

          </p>

          <div className="flex gap-4">

            <Link
              to="/about"
              className="hover:text-white transition-colors text-sm"
            >

              About

            </Link>

            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors text-sm"
            >

              Privacy Policy

            </Link>

            <Link
              to="/contact"
              className="hover:text-white transition-colors text-sm"
            >

              Contact

            </Link>
            <Link
              to="/terms"
              className="hover:text-green-500"
            >
              Terms & Conditions
            </Link>

          </div>
          </div>

      </footer>

    </div>
  );
}