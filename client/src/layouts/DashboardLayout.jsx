import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
    return (
        <div className="flex">
            <aside>
                Sidebar
            </aside>

            <main>
                <Outlet />
            </main>

            <footer>
                Footer
            </footer>
            
        </div>
    )
}

export default DashboardLayout