import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Loader2, ArrowRight } from 'lucide-react';
import api from '../utils/api';

const StudyPlanView = () => {
    const [config, setConfig] = useState({
        examDate: '',
        availableHours: 4,
        topics: ''
    });
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState(null);

    const generatePlan = async () => {
        setLoading(true);
        try {
            const topicList = config.topics.split(',').map(t => t.trim()).filter(Boolean);
            const res = await api.post('/tutor/plan', {
                examDate: config.examDate,
                availableHours: config.availableHours,
                topics: topicList
            });
            setPlan(res.data);
        } catch (error) {
            alert('Failed to generate plan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Smart Study Planner 📅</h1>

            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                <div className="md:col-span-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Exam Date</label>
                        <input
                            type="date"
                            className="w-full bg-slate-800 border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={config.examDate}
                            onChange={(e) => setConfig({ ...config, examDate: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Daily Study Hours: {config.availableHours}</label>
                        <input
                            type="range"
                            min="1" max="12"
                            className="w-full"
                            value={config.availableHours}
                            onChange={(e) => setConfig({ ...config, availableHours: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="md:col-span-8 flex flex-col">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Topics (comma separated)</label>
                    <textarea
                        className="flex-1 w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        placeholder="e.g. Thermodynamics, Calculus II, European History..."
                        value={config.topics}
                        onChange={(e) => setConfig({ ...config, topics: e.target.value })}
                    />
                    <button
                        onClick={generatePlan}
                        disabled={loading || !config.examDate}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                        Generate AI Plan
                    </button>
                </div>
            </div>

            {/* Plan Display */}
            {plan && (
                <div className="animate-fade-in space-y-6">
                    <div className="bg-indigo-900/20 border border-indigo-500/20 p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-indigo-400 mb-2">Plan Strategy</h2>
                        <p className="text-slate-300">{plan.plan_overview}</p>
                    </div>

                    <div className="space-y-4">
                        {plan.daily_schedule?.map((day) => (
                            <div key={day.day} className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                                <div className="bg-slate-800/80 px-6 py-3 flex items-center justify-between border-b border-slate-700/50">
                                    <h3 className="font-bold text-white">Day {day.day} - {day.date}</h3>
                                    <div className="flex gap-2">
                                        {day.focus_topics.map((t, i) => (
                                            <span key={i} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    {day.tasks.map((task, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-slate-300">
                                            <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-900 px-2 py-1 rounded">
                                                <Clock className="w-3 h-3" /> {task.time}
                                            </div>
                                            <span>{task.activity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyPlanView;
