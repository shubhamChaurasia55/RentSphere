import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../features/auth/authStore";
import { logoutUser } from "../../services/auth.service";

import Logo from "../common/Logo";

const Navbar = () => {

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

        <nav className="border-b px-4 py-4 flex items-center justify-between">

            <Link to="/" className="flex items-center">
                <Logo />
            </Link>

            <div className="flex items-center gap-6">
                {
                    !isAuthenticated ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>

                    ) : (
                        <>
                            {user?.role === "tenant" && <Link to="/tenant/dashboard">Dashboard</Link>}
                            {user?.role === "landlord" && <Link to="/landlord/dashboard">Dashboard</Link>}
                        </>
                    )

                }

                {
                    isAuthenticated ? (
                        <>
                            {user?.role === "tenant" && <Link to="/tenant/favorites">Favorites</Link>}
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </>

                    ) : null

                }

            </div>

        </nav>

    );

};

export default Navbar;