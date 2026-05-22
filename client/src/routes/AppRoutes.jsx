import { Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'

import LandlordDashboard from '../pages/landlord/Dashboard'
import TenantDashboard from '../pages/tenant/Dashboard'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../features/auth/ProtectedRoute'
import PropertyDetails from '../pages/PropertyDetails'

import MyProperties from "../pages/landlord/MyProperties";
import AddProperty from "../pages/landlord/AddProperty";
import EditProperty from "../pages/landlord/EditProperty";

import TenantLayout from "../layouts/TenantLayout";

import MyBookings from "../pages/tenant/MyBookings";

export const AppRoutes = () => {
    return (
        <Routes>

            {/* public routes */}
            <Route element={<MainLayout />} >
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path="/property/:id"
                    element={<PropertyDetails />}
                />
            </Route>



            {/* protected routes */}
            <Route

                path="/landlord"

                element={

                    <ProtectedRoute
                        allowedRoles={["landlord"]}
                    >

                        <DashboardLayout />

                    </ProtectedRoute>

                }

            >

                <Route
                    path="dashboard"
                    element={<LandlordDashboard />}
                />

                <Route
                    path="properties"
                    element={<MyProperties />}
                />

                <Route
                    path="add-property"
                    element={<AddProperty />}
                />

                <Route
                    path="edit-property/:id"
                    element={<EditProperty />}
                />

            </Route>

            <Route

                path="/tenant"

                element={

                    <ProtectedRoute
                        allowedRoles={["tenant"]}
                    >

                        <TenantLayout />

                    </ProtectedRoute>

                }

            >

                <Route

                    path="dashboard"

                    element={<TenantDashboard />}

                />

                <Route

                    path="bookings"

                    element={<MyBookings />}

                />

            </Route>

            {/* not found route */}
            <Route path='*' element={<NotFound />} />

        </Routes>
    );
}

export default AppRoutes;