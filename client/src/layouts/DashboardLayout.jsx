import { Outlet } from "react-router-dom";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const DashboardLayout = () => {

    return (

        <div className="min-h-screen grid grid-cols-12">

            <div className="col-span-2 border-r">

                <DashboardSidebar />

            </div>

            <div className="col-span-10 p-6">

                <Outlet />

            </div>

        </div>

    );

};

export default DashboardLayout;