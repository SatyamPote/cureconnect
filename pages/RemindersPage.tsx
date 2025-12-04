import React from 'react';
import { Clock, Calendar, RefreshCw } from 'lucide-react';

export const RemindersPage = () => {
    // Mock past orders / history


    return (
        <div className="pb-20">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="text-teal-600" /> Smart Reminders & History
            </h1>

            <div className="space-y-6">
                {/* Refill Alerts */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h2 className="font-bold text-lg text-amber-800 mb-4 flex items-center gap-2">
                        <RefreshCw size={20} /> Refills Due
                    </h2>
                    <div className="space-y-3">
                        {/* Placeholder for real order history */}
                        <div className="text-center py-8 text-slate-500">
                            <p>No refill reminders yet.</p>
                            <p className="text-xs mt-1">Your past orders will appear here to help you refill on time.</p>
                        </div>
                    </div>
                </div>

                {/* Active Courses */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-indigo-600" /> Active Courses
                    </h2>
                    <div className="space-y-3">
                        <div className="text-center py-8 text-slate-500">
                            <p>No active medicine courses.</p>
                            <p className="text-xs mt-1">Track your daily medicine intake here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
