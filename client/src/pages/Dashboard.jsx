import React from 'react';
import { Upload, FileText, Calendar, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl hover:border-slate-600 transition-all group">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 opacity-80 group-hover:opacity-100 transition-opacity`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Scholar! 🚀</h1>
                <p className="text-slate-400">Ready to crush your exams today?</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Upload} label="Notes Uploaded" value="12" color="bg-blue-500 text-blue-500" />
                <StatCard icon={FileText} label="Flashcards" value="148" color="bg-emerald-500 text-emerald-500" />
                <StatCard icon={Calendar} label="Study Hours" value="24.5" color="bg-purple-500 text-purple-500" />
                <StatCard icon={Zap} label="Current Streak" value="5 days" color="bg-amber-500 text-amber-500" />
            </div>

            {/* Quick Actions */}
            <h2 className="text-xl font-semibold mt-10 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/upload" className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Upload className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Upload Notes</h3>
                        <p className="text-indigo-200 text-sm mb-4">Turn PDFs and images into summaries & quizzes instantly.</p>
                        <div className="flex items-center text-sm font-semibold text-white">
                            Start Uploading <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>

                <Link to="/planner" className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800 transition-colors group">
                    <h3 className="text-xl font-bold mb-2">Create Study Plan</h3>
                    <p className="text-slate-400 text-sm mb-4">Get a tailored schedule based on your exam dates.</p>
                    <div className="flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300">
                        Generate Plan <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                </Link>

                <Link to="/tutor" className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800 transition-colors group">
                    <h3 className="text-xl font-bold mb-2">Ask Tutor</h3>
                    <p className="text-slate-400 text-sm mb-4">Stuck on a concept? Get instant AI clarifications.</p>
                    <div className="flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300">
                        Start Chat <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
