
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';
import { AnalyticsIcon } from '../ui/icons';
import { mockKeywordRanks } from '../../utils/mockData';
import type { KeywordRank } from '../../types';

const RankTracker: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordRank>(mockKeywordRanks[0]);

  const chartData = selectedKeyword.history.map(h => ({ name: h.date, position: h.position }));
  const currentPosition = selectedKeyword.history[selectedKeyword.history.length - 1].position;
  const previousPosition = selectedKeyword.history[selectedKeyword.history.length - 2].position;
  const change = currentPosition - previousPosition;

  const getChangeColor = (change: number) => {
    if (change < 0) return 'text-brand-green';
    if (change > 0) return 'text-brand-red';
    return 'text-gray-500';
  };
  
  const getChangeArrow = (change: number) => {
    if (change < 0) return '▲';
    if (change > 0) return '▼';
    return '–';
  };

  return (
    <Card title="Local Rank Tracker" icon={AnalyticsIcon}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 pr-4">
          <div className="mb-4">
            <h4 className="text-lg font-bold text-gray-800">{selectedKeyword.keyword}</h4>
            <p className="text-sm text-gray-500">{selectedKeyword.location}</p>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-gray-900">#{currentPosition}</span>
              <span className={`ml-3 text-lg font-semibold ${getChangeColor(-change)}`}>
                 {getChangeArrow(-change)} {Math.abs(change)}
              </span>
            </div>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis reversed domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="position" stroke="#1a73e8" strokeWidth={2} name="Rank Position"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:border-l md:pl-4">
          <h5 className="font-semibold mb-2 text-gray-700">Tracked Keywords</h5>
          <ul>
            {mockKeywordRanks.map((kw) => (
              <li key={kw.keyword}>
                <button
                  onClick={() => setSelectedKeyword(kw)}
                  className={`w-full text-left p-2 rounded-md ${selectedKeyword.keyword === kw.keyword ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                >
                  <p className={`font-medium ${selectedKeyword.keyword === kw.keyword ? 'text-brand-blue' : 'text-gray-800'}`}>{kw.keyword}</p>
                  <p className="text-sm text-gray-500">{kw.location}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default RankTracker;
