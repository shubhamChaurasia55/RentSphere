import React from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Camera,
  Send,
  Briefcase,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-16 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-1 cursor-pointer">
              <Logo />
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500 max-w-sm">
              RentSphere helps tenants discover verified rental properties
              while giving landlords a seamless platform for listings,
              bookings, and communication.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-6">

            {/* WEBSITE */}
            <div className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center cursor-pointer transition-all duration-300">
                <Globe className="w-5 h-5 text-indigo-600" />
            </div>

            {/* INSTAGRAM */}
            <div className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center cursor-pointer transition-all duration-300">
                <Camera className="w-5 h-5 text-indigo-600" />
            </div>

            {/* TWITTER */}
            <div className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center cursor-pointer transition-all duration-300">
                <Send className="w-5 h-5 text-indigo-600" />
            </div>

            {/* LINKEDIN */}
            <div className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center cursor-pointer transition-all duration-300">
                <Briefcase className="w-5 h-5 text-indigo-600" />
            </div>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              
              <Link
                to="/"
                className="text-slate-500 hover:text-indigo-600 transition-all duration-300"
              >
                Home
              </Link>

              <Link
                to="/properties"
                className="text-slate-500 hover:text-indigo-600 transition-all duration-300"
              >
                Properties
              </Link>

              <Link
                to="/about"
                className="text-slate-500 hover:text-indigo-600 transition-all duration-300"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-slate-500 hover:text-indigo-600 transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Platform
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-500">
              <span className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">
                Browse Properties
              </span>

              <span className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">
                Tenant Dashboard
              </span>

              <span className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">
                Landlord Listings
              </span>

              <span className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">
                Property Booking
              </span>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Contact
            </h3>

            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-500">
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-600 mt-0.5" />

                <span>support@rentsphere.com</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-indigo-600 mt-0.5" />

                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />

                <span>Bhopal, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} RentSphere. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span className="hover:text-indigo-600 cursor-pointer transition-all duration-300">
              Privacy Policy
            </span>

            <span className="hover:text-indigo-600 cursor-pointer transition-all duration-300">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}