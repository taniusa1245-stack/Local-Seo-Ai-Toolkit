
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';
import { CompassIcon } from '../ui/icons';
import { mockAIVisibility, mockBusinessProfile } from '../../utils/mockData';
import { generateAIVisibilityExample } from '../../services/geminiService';
import Spinner from '../ui/Spinner';

const AIVisibility: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [aiExample, setAiExample] = useState('');
    const chartData = mockAIVisibility[0].history;

    const handleGenerateExample = async () => {
        setIsLoading(true);
        const example = await generateAIVisibilityExample(mockBusinessProfile.name, mockBusinessProfile.type, 'Sunnyvale');
        setAiExample(example);
        setIsLoading(false);
    };
    
    useEffect(() => {
        handleGenerateExample();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card title="Local AI Visibility" icon={CompassIcon}>
            <p className="mb-4 text-sm">Tracks how often and prominently your business appears in AI-generated search results and recommendations.</p>
            <div style={{ width: '100%', height: 200 }} className="mb-4">
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#1a73e8" name="AI Visibility Score" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700 mb-2">Example AI Mention</h4>
                <div className="p-3 bg-gray-100 rounded-lg text-sm italic min-h-[80px]">
                    {isLoading && !aiExample ? <div className="flex justify-center items-center h-full"><Spinner className="w-6 h-6 text-brand-blue" /></div> : <p>{aiExample}</p>}
                </div>
                 <button 
                    onClick={handleGenerateExample}
                    disabled={isLoading}
                    className="mt-3 w-full text-sm bg-brand-blue text-white py-2 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors flex items-center justify-center disabled:bg-gray-400"
                >
                    {isLoading ? <Spinner /> : 'Generate New Example'}
                </button>
            </div>
        </Card>
    );
};

export default AIVisibility;
