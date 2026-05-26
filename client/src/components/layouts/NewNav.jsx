import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../features/auth/authStore";
import { logoutUser } from "../../services/auth.service";

import {
  Menu,
  X,
  Heart,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import Logo from "../common/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "Properties"];

  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuthStore();

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
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* MAIN NAVBAR */}
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link to="/">
            <div className="flex items-center gap-1 cursor-pointer">
              <Logo />
            </div>
          </Link>

          {/* DESKTOP RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* DESKTOP NAV LINKS */}
            <div className="flex items-center gap-6 mr-4 border-r border-gray-200 pr-8">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <button className="px-5 py-2.5 rounded-xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-300">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition-all duration-300">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                {/* DASHBOARD BUTTON */}
                <Link
                  to={
                    user?.role === "tenant"
                      ? "/tenant/dashboard"
                      : "/landlord/dashboard"
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:border-indigo-500 hover:text-indigo-600 text-slate-700 font-semibold transition-all duration-300 shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                {/* FAVORITES */}
                {user?.role === "tenant" && (
                  <Link
                    to="/favorites"
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 shadow-sm"
                  >
                    <Heart className="w-5 h-5 text-indigo-600" />
                    {user?.favorites?.length > 0 && (
                      <div className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md border-2 border-white">
                        {user.favorites.length}
                      </div>
                    )}
                  </Link>
                )}

                {/* PROFILE DROPDOWN (Hover Trigger) */}
                <div className="relative group pl-2 border-l border-gray-200">
                  
                  {/* AVATAR ICON */}
                  <div className="relative cursor-pointer transition-transform group-hover:scale-105">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="user"
                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold text-lg uppercase shadow-md border-2 border-white">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                    {/* ONLINE DOT */}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>

                  {/* DROPDOWN MENU */}
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
                    
                    {/* USER HEADER */}
                    <div className="p-5 border-b border-gray-100 flex items-center gap-4 bg-slate-50/50 rounded-t-2xl">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="user"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl uppercase">
                          {user?.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <div className="flex flex-col overflow-hidden">
                        <h3 className="font-bold text-slate-900 truncate">
                          {user?.name || "User"}
                        </h3>
                        <p className="text-xs text-gray-500 truncate mb-1">
                          {user?.email || "user@example.com"}
                        </p>
                        <span className="w-fit px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                          {user?.role}
                        </span>
                      </div>
                    </div>

                    {/* ACTION LINKS */}
                    <div className="p-3 flex flex-col gap-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        View Profile
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[800px] opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">

            {/* NAV LINKS */}
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
              >
                {item}
              </Link>
            ))}

            {/* NOT AUTHENTICATED */}
            {!isAuthenticated ? (
              <div className="flex flex-col gap-3 px-4 pt-4 border-t border-gray-100 mt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all">
                    Login
                  </button>
                </Link>

                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-md">
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="px-4 pt-4 border-t border-gray-100 mt-2 flex flex-col gap-2">
                
                {/* MOBILE USER INFO */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-2">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="user"
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl uppercase shadow-sm">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <h3 className="font-bold text-slate-900 truncate">{user?.name || "User"}</h3>
                    <p className="text-xs text-gray-500 truncate mb-1">{user?.email}</p>
                    <span className="w-fit px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-800 text-[10px] font-bold uppercase">
                      {user?.role}
                    </span>
                  </div>
                </div>

                {/* MOBILE USER ACTIONS */}
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                >
                  <User className="w-5 h-5" /> View Profile
                </Link>

                <Link
                  to={user?.role === "tenant" ? "/tenant/dashboard" : "/landlord/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>

                {user?.role === "tenant" && (
                  <Link
                    to="/favorites"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5" /> Favorites
                    </div>
                    {user?.favorites?.length > 0 && (
                      <span className="bg-indigo-100 text-indigo-700 text-xs py-1 px-2.5 rounded-full">
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
                  className="flex items-center gap-3 w-full mt-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Logout
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