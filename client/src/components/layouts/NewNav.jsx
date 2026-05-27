import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../features/auth/authStore";
import { logoutUser } from "../../services/auth.service";
import SearchBar from "../search/SearchBar";

import {
  Menu,
  X,
  Heart,
  User,
  LogOut,
  LayoutDashboard,
  Building2,
} from "lucide-react";

import Logo from "../common/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav 
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100" 
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-4">
        
        {/* MAIN NAVBAR */}
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4 lg:gap-8">
          
          {/* LEFT: LOGO */}
          <Link to="/" className="flex-shrink-0 relative group">
            <div className="flex items-center gap-1 cursor-pointer transition-transform duration-300 group-hover:scale-105">
              <Logo />
            </div>
          </Link>

          {/* CENTER: SEARCH BAR (Visible on ALL screens) */}
          {/* We use flex-1 so it takes up remaining space between logo and menu */}
          <div className="flex flex-1 w-full max-w-2xl mx-1 sm:mx-4">
            <SearchBar />
          </div>

          {/* RIGHT SIDE (Desktop ONLY) */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            
            <Link
              to="/properties"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-slate-600 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-all duration-300"
            >
              <Building2 className="w-4 h-4" />
              Properties
            </Link>

            {!isAuthenticated ? (
              <div className="flex items-center gap-2 ml-2">
                <Link to="/login">
                  <button className="px-6 py-2.5 rounded-full text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-300">
                    Log in
                  </button>
                </Link>

                <Link to="/register">
                  <button className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5">
                    Sign up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                
                {/* DASHBOARD */}
                <Link
                  to={user?.role === "tenant" ? "/tenant/dashboard" : "/landlord/dashboard"}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-slate-600 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                {/* FAVORITES BUTTON (Now shows actual number) */}
                {user?.role === "tenant" && (
                  <Link
                    to="/favorites"
                    className="relative flex items-center justify-center w-11 h-11 rounded-full text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                  >
                    <Heart className="w-5 h-5" />
                    {user?.favorites?.length > 0 && (
                      <div className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                        {user.favorites.length}
                      </div>
                    )}
                  </Link>
                )}

                {/* PROFILE DROPDOWN */}
                <div className="relative group ml-2">
                  <div className="flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 cursor-pointer bg-white">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="user"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold text-sm uppercase">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <Menu className="w-4 h-4 text-gray-500" />
                  </div>

                  {/* DROPDOWN MENU */}
                  <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
                    <div className="p-5 border-b border-gray-50 flex items-center gap-4">
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt="user" className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl uppercase">
                          {user?.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <div className="flex flex-col overflow-hidden">
                        <h3 className="font-bold text-slate-900 truncate">{user?.name || "User"}</h3>
                        <p className="text-xs text-gray-500 truncate mb-1">{user?.email}</p>
                        <span className="w-fit px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                          {user?.role}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 flex flex-col gap-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <User className="w-4 h-4" /> View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 sm:p-2 flex-shrink-0 text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>
        </div>

        {/* MOBILE & TABLET MENU TRAY */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[1000px] opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
            
            <Link
              to="/properties"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 text-slate-700 font-semibold hover:bg-slate-50 rounded-2xl transition-colors mx-2"
            >
              <Building2 className="w-5 h-5 text-slate-400" /> Properties
            </Link>

            {!isAuthenticated ? (
              <div className="flex flex-col gap-3 px-4 pt-4 border-t border-gray-50 mt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-6 py-3.5 rounded-2xl text-slate-700 font-bold bg-slate-50 hover:bg-slate-100 transition-all">
                    Log in
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-all shadow-md">
                    Sign up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="px-4 pt-4 border-t border-gray-50 mt-2 flex flex-col gap-2">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl mb-3">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt="user" className="w-14 h-14 rounded-full object-cover shadow-sm" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl uppercase shadow-sm">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <h3 className="font-bold text-slate-900 truncate">{user?.name || "User"}</h3>
                    <p className="text-xs text-gray-500 truncate mb-1">{user?.email}</p>
                    <span className="w-fit px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors"
                >
                  <User className="w-5 h-5 text-slate-400" /> View Profile
                </Link>

                <Link
                  to={user?.role === "tenant" ? "/tenant/dashboard" : "/landlord/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 text-slate-400" /> Dashboard
                </Link>

                {/* MOBILE FAVORITES COUNTER (Live Updating) */}
                {user?.role === "tenant" && (
                  <Link
                    to="/favorites"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-slate-400" /> Saved Properties
                    </div>
                    {user?.favorites?.length > 0 && (
                      <span className="bg-red-100 text-red-600 text-xs font-bold py-1 px-3 rounded-full">
                        {user.favorites.length}
                      </span>
                    )}
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full mt-2 px-4 py-3.5 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;