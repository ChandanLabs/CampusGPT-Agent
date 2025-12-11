import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import api from '../utils/api';

const UploadView = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/upload/process', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data.data);
        } catch (error) {
            console.error('Upload failed', error);
            alert('Upload failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Upload Materials</h1>
                <p className="text-slate-400">Upload your PDF notes or photos of the whiteboard.</p>
            </div>

            {/* Upload Box */}
            <div className="bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center text-center hover:border-indigo-500/50 transition-colors">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                    {file ? file.name : "Drag & drop or click to upload"}
                </h3>
                <p className="text-slate-400 text-sm max-w-sm mb-6">
                    Supported formats: PDF, JPG, PNG. Limit 10MB.
                </p>

                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                />

                {!file ? (
                    <label
                        htmlFor="file-upload"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors"
                    >
                        Select File
                    </label>
                ) : (
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        {loading ? 'Processing...' : 'Process Notes'}
                    </button>
                )}
            </div>

            {/* Results Display */}
            {result && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4 text-emerald-400">Summary</h2>
                        <p className="leading-relaxed text-slate-300">{result.summary}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4 text-indigo-400">Key Points</h2>
                            <ul className="space-y-2 list-disc list-outside ml-4 text-slate-300">
                                {result.key_points?.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4 text-purple-400">Q&A Pairs</h2>
                            <div className="space-y-4">
                                {result.qa_pairs?.map((qa, idx) => (
                                    <div key={idx} className="bg-slate-900/50 p-4 rounded-xl">
                                        <p className="font-semibold text-white mb-1">Q: {qa.question}</p>
                                        <p className="text-slate-400 text-sm">A: {qa.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadView;
