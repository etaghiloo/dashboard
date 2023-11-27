import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "./style.css";

export default function MainLayout() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    })
    
    return (
        <div className="main-layout-wrapper">
            <Sidebar />
            <Outlet />
        </div>
    )
}