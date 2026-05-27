import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { 
    Home, 
    Heart, 
    Bell, 
    ChevronRight, 
    CreditCard, 
    MapPin, 
    CheckCircle2,
    Clock,
    XCircle,
    Loader2
} from "lucide-react";

import { getMyBookings } from "../../services/booking.service";
import { getFavorites } from "../../services/favorite.service";
import { getNotifications } from "../../services/notification.service";
import useAuthStore from "../../features/auth/authStore";

const TenantDashboard = () => {
    const { user } = useAuthStore();

    // 1. FETCH ALL DATA
    const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
        queryKey: ["my-bookings"],
        queryFn: getMyBookings
    });

    const { data: favoritesData, isLoading: favLoading } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites
    });

    const { data: notificationsData, isLoading: notifLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications
    });

    // Handle global loading state for the dashboard
    if (bookingsLoading || favLoading || notifLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                <p className="font-semibold text-lg">Loading your dashboard...</p>
            </div>
        );
    }

    // 2. ORGANIZE DATA
    const bookings = bookingsData?.bookings || [];
    const favoritesCount = favoritesData?.favorites?.length || 0;
    const notificationsCount = notificationsData?.notifications?.length || 0;

    // Split bookings for the UI: 1 featured hero booking, the rest in the sidebar list
    const latestBooking = bookings[0];
    const recentBookingsList = bookings.slice(1, 4);

    // Helper function for dynamic status colors
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return "bg-green-100 text-green-700 border-green-200";
            case "rejected":
                return "bg-red-100 text-red-700 border-red-200";
            case "pending":
            default:
                return "bg-amber-100 text-amber-700 border-amber-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return <CheckCircle2 className="w-3 h-3" />;
            case "rejected":
                return <XCircle className="w-3 h-3" />;
            case "pending":
            default:
                return <Clock className="w-3 h-3" />;
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            
            {/* ================= HEADER & GREETING ================= */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
                </h1>
                <p className="text-slate-500">Manage your bookings, favorites, and notifications.</p>
            </div>

            {/* ================= QUICK STATS GRID ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-10">
                
                {/* Bookings Stat */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
                    <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                        <Home className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Total Bookings</p>
                        <h3 className="text-2xl font-bold text-slate-900">{bookings.length}</h3>
                    </div>
                </div>

                {/* Favorites Stat */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Saved Homes</p>
                        <h3 className="text-2xl font-bold text-slate-900">{favoritesCount}</h3>
                    </div>
                </div>

                {/* Notifications Stat */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
                    <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                        <Bell className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Notifications</p>
                        <h3 className="text-2xl font-bold text-slate-900">{notificationsCount}</h3>
                    </div>
                </div>

            </div>

            {/* ================= MAIN CONTENT SPLIT ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Hero Booking Area (Takes 2/3 width) */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    
                    {/* LATEST BOOKING CARD */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Latest Booking Activity</h2>
                            <Link to="/tenant/bookings" className="text-indigo-600 text-sm font-medium hover:underline">
                                View all bookings
                            </Link>
                        </div>

                        {latestBooking ? (
                            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] group">
                                <div className="flex flex-col md:flex-row">
                                    
                                    {/* Image Side */}
                                    <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden bg-slate-100">
                                        <span className={`absolute top-4 left-4 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider z-10 flex items-center gap-1 shadow-sm border ${getStatusStyles(latestBooking.status)}`}>
                                            {getStatusIcon(latestBooking.status)} {latestBooking.status}
                                        </span>
                                        <img 
                                            src={latestBooking.property?.images?.[0] || "/api/placeholder/400/300"} 
                                            alt={latestBooking.property?.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                        />
                                    </div>

                                    {/* Details Side */}
                                    <div className="p-6 md:w-3/5 flex flex-col">
                                        <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-1">
                                            {latestBooking.property?.title || "Property Title"}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
                                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span className="truncate">{latestBooking.property?.city || "Location"}</span>
                                        </div>

                                        {/* Status Message */}
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                                            <p className="text-sm font-medium text-slate-700">
                                                {latestBooking.status === "pending" && "Your request is currently being reviewed by the landlord."}
                                                {latestBooking.status === "accepted" && "Congratulations! Your booking has been approved."}
                                                {latestBooking.status === "rejected" && "Unfortunately, this booking request was declined."}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex items-center justify-end border-t border-slate-100 pt-4">
                                            <Link to={`/property/${latestBooking.property?._id}`} className="bg-slate-900 hover:bg-black text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition shadow-sm">
                                                View Property
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            /* Empty State for Bookings */
                            <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
                                <div className="bg-indigo-50 p-4 rounded-full mb-4">
                                    <Home className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">No bookings yet</h3>
                                <p className="text-slate-500 max-w-sm mb-6">You haven't requested any properties yet. Start exploring to find your next home!</p>
                                <Link to="/properties" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition shadow-sm">
                                    Explore Properties
                                </Link>
                            </div>
                        )}
                    </div>

                </div>

                {/* RIGHT COLUMN: Sidebar (Takes 1/3 width) */}
                <div className="flex flex-col gap-8">

                    {/* OTHER RECENT BOOKINGS LIST */}
                    {recentBookingsList.length > 0 && (
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                            </div>

                            <div className="flex flex-col gap-4">
                                {recentBookingsList.map((booking) => (
                                    <Link 
                                        to={`/property/${booking.property?._id}`}
                                        key={booking._id} 
                                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 mt-1">
                                            <img 
                                                src={booking.property?.images?.[0] || "/api/placeholder/100/100"} 
                                                alt="thumb" 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                                                {booking.property?.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 truncate mb-1.5">{booking.property?.city}</p>
                                            <div className="flex items-center">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${getStatusStyles(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* QUICK ACTIONS WIDGET */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                        <h2 className="text-lg font-bold text-slate-900 mb-5">Quick Actions</h2>
                        
                        <div className="flex flex-col gap-3">
                            <Link to="/properties" className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                                        <Home className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700">Browse Properties</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                            </Link>

                            <Link to="/favorites" className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                                        <Heart className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-red-600">View Saved Homes</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                            </Link>

                            <Link to="/tenant/notifications" className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                                        <Bell className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700">Notifications</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TenantDashboard;