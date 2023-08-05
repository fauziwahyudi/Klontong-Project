import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar'

export default function Layout() {
    return (
        <>
            <div className="container container-custom">
                <Sidebar />

                <div className="main-content">
                    <div id="menu-button">
                        <input type="checkbox" id="menu-checkbox" />
                        <label htmlFor="menu-checkbox" id="menu-label">
                            <div id="hamburger"></div>
                        </label>
                    </div>
                    <Outlet />
                </div>

            </div>
        </>
    )
}