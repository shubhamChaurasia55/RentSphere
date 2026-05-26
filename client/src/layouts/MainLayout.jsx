import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer.jsx";
import Navbar from "../components/layouts/Navbar.jsx";
import NewNavbar from "../components/layouts/NewNav.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NewNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
