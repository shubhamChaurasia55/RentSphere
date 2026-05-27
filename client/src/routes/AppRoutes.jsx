import { Routes, Route } from 'react-router-dom'

import PublicRoute from '../features/auth/PublicRoute'
import ProtectedRoute from '../features/auth/ProtectedRoute'

import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import TenantLayout from "../layouts/TenantLayout";

// --- PUBLIC PAGES ---
import Home from '../pages/Home'
import Properties from '../pages/Properties' // <-- NEW IMPORT
import PropertyDetails from '../pages/PropertyDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'

// --- LANDLORD PAGES ---
import LandlordDashboard from '../pages/landlord/Dashboard'
import MyProperties from "../pages/landlord/MyProperties";
import AddProperty from "../pages/landlord/AddProperty";
import EditProperty from "../pages/landlord/EditProperty";
import BookingRequests from "../pages/landlord/BookingRequests";

// --- TENANT PAGES ---
import TenantDashboard from '../pages/tenant/Dashboard'
import MyBookings from "../pages/tenant/MyBookings";
import Favorites from "../pages/tenant/Favorites";
import Notifications from "../pages/Notifications";

export const AppRoutes = () => {
    return (
        <Routes>

            {/* =======================================
                PUBLIC ROUTES (Uses Main Navbar/Footer)
                ======================================= */}
            <Route element={<MainLayout />}>

                <Route path='/' element={<Home />} />
                
                {/* <-- NEW PROPERTIES ROUTE HERE --> */}
                <Route path='/properties' element={<Properties />} />

                <Route
                    path='/login'
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path='/register'
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/property/:id"
                    element={<PropertyDetails />}
                />

                {/* Favorites requires a logged-in Tenant, but still uses MainLayout */}
                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute allowedRoles={["tenant"]}>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />

            </Route>

            {/* =======================================
                LANDLORD PROTECTED ROUTES
                ======================================= */}
            <Route
                path="/landlord"
                element={
                    <ProtectedRoute allowedRoles={["landlord"]}>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<LandlordDashboard />} />
                <Route path="properties" element={<MyProperties />} />
                <Route path="add-property" element={<AddProperty />} />
                <Route path="edit-property/:id" element={<EditProperty />} />
                <Route path="booking-requests" element={<BookingRequests />} />
            </Route>

            {/* =======================================
                TENANT PROTECTED ROUTES
                ======================================= */}
            <Route
                path="/tenant"
                element={
                    <ProtectedRoute allowedRoles={["tenant"]}>
                        <TenantLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<TenantDashboard />} />
                <Route path="bookings" element={<MyBookings />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>

            {/* =======================================
                CATCH-ALL ROUTE (404 Not Found)
                ======================================= */}
            <Route path='*' element={<NotFound />} />

        </Routes>
    );
}

export default AppRoutes;