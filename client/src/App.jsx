import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UploadView from './pages/UploadView';
import StudyPlanView from './pages/StudyPlanView';
import TutorView from './pages/TutorView';

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(false); // Reset on desktop
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Sidebar
                isOpen={isSidebarOpen}
                toggle={() => setSidebarOpen(!isSidebarOpen)}
                isMobile={isMobile}
            />

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-slate-300 hover:text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-lg">CampusGPT</span>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="md:ml-64 min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4 pt-20 md:p-8 md:pt-8 transition-all duration-300">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/upload" element={<UploadView />} />
                    <Route path="/planner" element={<StudyPlanView />} />
                    <Route path="/tutor" element={<TutorView />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
