import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';
import { analyzePrescription } from '../services/geminiService';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const PrescriptionUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [extractedMedicines, setExtractedMedicines] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addToCart, addPoints } = useApp();
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleAnalyze = async () => {
        if (!preview) return;
        setIsAnalyzing(true);
        try {
            // Remove data:image/jpeg;base64, prefix
            const base64Data = preview.split(',')[1];
            const results = await analyzePrescription(base64Data);
            setExtractedMedicines(results);
        } catch (error) {
            alert("Failed to analyze prescription. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleAddToCart = () => {
        // In a real app, we'd match these to our database.
        // For now, we'll just alert or add them as generic items if the context supported it.
        // Since our CartItem requires a valid Medicine ID and Pharmacy ID, we can't easily add them directly 
        // without a "search and match" step.
        // For this demo, we'll simulate the matching.
        addPoints(50);
        alert(`Added ${extractedMedicines.length} medicines to cart. You earned 50 Health Points!`);
        navigate('/cart');
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <FileText className="text-teal-600" />
                Upload Prescription
            </h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                {!preview ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-300 rounded-xl p-10 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                        <Upload size={48} className="mx-auto text-slate-400 mb-4" />
                        <p className="text-slate-600 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400 mt-2">JPG, PNG up to 5MB</p>
                    </div>
                ) : (
                    <div className="relative">
                        <img src={preview} alt="Prescription" className="max-h-64 mx-auto rounded-lg shadow-md" />
                        <button
                            onClick={() => { setFile(null); setPreview(null); setExtractedMedicines([]); }}
                            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-red-50 text-slate-600 hover:text-red-500"
                        >
                            <AlertCircle size={20} />
                        </button>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />

                {preview && !extractedMedicines.length && (
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 flex items-center gap-2 mx-auto"
                    >
                        {isAnalyzing ? <><Loader2 className="animate-spin" /> Analyzing...</> : 'Analyze Prescription'}
                    </button>
                )}
            </div>

            {extractedMedicines.length > 0 && (
                <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-bottom-4">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Extracted Medicines</h3>
                    <div className="space-y-3">
                        {extractedMedicines.map((med, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <p className="font-semibold text-slate-900">{med.name}</p>
                                    <p className="text-xs text-slate-500">{med.dosage} • {med.type}</p>
                                </div>
                                <div className="font-medium text-slate-700">Qty: {med.quantity}</div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Check size={20} /> Confirm & Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
};
