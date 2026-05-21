import {Routes, Route} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'

import LandlordDashboard from '../pages/landlord/Dashboard'
import TenantDashboard from '../pages/tenant/Dashboard'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../features/auth/ProtectedRoute'

export const AppRoutes = () => {
    return (
        <Routes>
            
            {/* public routes */}
            <Route element={<MainLayout/>} >
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Route>

            {/* protected routes */}
            <Route path="/landlord/dashboard"
             element={
                <ProtectedRoute allowedRoles={["landlord"]}>
                    <LandlordDashboard />
                </ProtectedRoute>
             }
            />
            <Route path="/tenant/dashboard"
             element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                    <TenantDashboard />
                </ProtectedRoute>
             }
            />

            {/* not found route */}
            <Route path='*' element={<NotFound/>} />

        </Routes>
    );
}

export default AppRoutes;