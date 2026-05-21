import { NavLink } from "react-router-dom";

const DashboardSidebar = () => {

    return (

        <div className="p-6 flex flex-col gap-6">

            <h1 className="text-2xl font-bold">

                Dashboard

            </h1>

            <NavLink to="/landlord/dashboard">

                Overview

            </NavLink>

            <NavLink to="/landlord/properties">

                My Properties

            </NavLink>

            <NavLink to="/landlord/add-property">

                Add Property

            </NavLink>

        </div>

    );

};

export default DashboardSidebar;