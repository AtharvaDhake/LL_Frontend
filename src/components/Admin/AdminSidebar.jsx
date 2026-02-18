import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaStore, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { clearCart } from "../../redux/slice/cartSlice";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/");
    };

    const navItems = [
        { to: "/admin", end: true, icon: FaHome, label: "Dashboard" },
        { to: "/admin/users", icon: FaUser, label: "Users" },
        { to: "/admin/products", icon: FaBoxOpen, label: "Products" },
        { to: "/admin/orders", icon: FaClipboardList, label: "Orders" },
    ];

    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            {/* Logo Section */}
            <div className="p-5 border-b border-slate-700/50">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                        <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-white leading-tight">Learning Lounge</h1>
                        <p className="text-xs text-slate-400 font-medium">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isActive 
                                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/30" 
                                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                            }`
                        }
                    >
                        <item.icon className="text-base flex-shrink-0" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}

                <div className="my-3 border-t border-slate-700/50"></div>

                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
                >
                    <FaStore className="text-base flex-shrink-0" />
                    <span>Back to Shop</span>
                </NavLink>
            </nav>

            {/* Logout Button */}
            <div className="p-3 border-t border-slate-700/50">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-medium text-sm border border-red-500/30 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20"
                >
                    <FaSignOutAlt className="text-base" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
