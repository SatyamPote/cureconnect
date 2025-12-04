import React from 'react';
import { Video, Calendar, Star, Clock } from 'lucide-react';

export const TeleconsultationPage = () => {
    const doctors = [
        { id: 1, name: "Dr. Anjali Sharma", specialty: "General Physician", rating: 4.9, experience: "8 years", available: true },
        { id: 2, name: "Dr. Rajesh Kumar", specialty: "Dermatologist", rating: 4.7, experience: "12 years", available: false },
        { id: 3, name: "Dr. Priya Singh", specialty: "Pediatrician", rating: 4.8, experience: "5 years", available: true },
    ];

    return (
        <div className="pb-20">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Teleconsultation</h1>
                    <p className="text-slate-500">Connect with top doctors instantly</p>
                </div>
                <button className="bg-teal-100 text-teal-800 px-4 py-2 rounded-lg font-medium text-sm">
                    My Appointments
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {doctors.map(doc => (
                    <div key={doc.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-slate-900">{doc.name}</h3>
                                    <p className="text-sm text-teal-600 font-medium">{doc.specialty}</p>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded">
                                    <Star size={10} className="fill-amber-700" /> {doc.rating}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                <span>{doc.experience} exp</span>
                                <span>•</span>
                                <span>MBBS, MD</span>
                            </div>

                            <div className="mt-4 flex gap-2">
                                {doc.available ? (
                                    <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 flex items-center justify-center gap-2">
                                        <Video size={16} /> Consult Now
                                    </button>
                                ) : (
                                    <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2">
                                        <Calendar size={16} /> Schedule
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
