import {

    Outlet

} from "react-router-dom";

const TenantLayout = () => {

    return (

        <div className="min-h-screen p-6">

            <Outlet />

        </div>

    );

};

export default TenantLayout;