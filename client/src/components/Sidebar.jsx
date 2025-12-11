import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, BookOpen, GraduationCap, Settings, X, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ isOpen, toggle, isMobile }) => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Upload, label: 'Upload Notes', path: '/upload' },
        { icon: BookOpen, label: 'Study Planner', path: '/planner' },
        { icon: GraduationCap, label: 'AI Tutor', path: '/tutor' },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={toggle}
                />
            )}

            {/* Sidebar Container */}
            <div className={clsx(
                "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 text-white flex flex-col p-6 transition-transform duration-300 ease-in-out",
                // Mobile: slide in/out based on isOpen. Desktop: always show.
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>

                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <GraduationCap className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            CampusGPT
                        </h1>
                    </div>
                    {/* Close Button on Mobile */}
                    {isMobile && (
                        <button onClick={toggle} className="md:hidden text-slate-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Nav Items */}
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={isMobile ? toggle : undefined} // Close on click for mobile
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                                    isActive
                                        ? "bg-indigo-600 shadow-lg shadow-indigo-600/20 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <item.icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-slate-700/50 space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white cursor-pointer transition-colors hover:bg-slate-800 rounded-lg">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
