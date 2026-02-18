import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">L</span>
                    </div>
                    <h2 className="text-lg font-bold">Admin Panel</h2>
                </div>
                <button 
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                    {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 ease-in-out md:static`}
            >
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen md:ml-0">
                {/* Mobile spacer */}
                <div className="h-16 md:hidden"></div>
                
                {/* Content area */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
            
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;
