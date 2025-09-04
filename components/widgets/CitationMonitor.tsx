import React from 'react';
import Card from '../ui/Card';
import type { CitationStatus } from '../../types';
import { mockCitations } from '../../utils/mockData';
import { AnalyticsIcon } from '../ui/icons';

const statusStyles: Record<CitationStatus, string> = {
  'Listed': 'bg-green-100 text-green-800',
  'Inconsistent': 'bg-yellow-100 text-yellow-800',
  'Not Found': 'bg-red-100 text-red-800'
};

const CitationMonitor: React.FC = () => {
  return (
    <Card title="Local Citation Monitor" icon={AnalyticsIcon}>
      <p className="text-sm mb-4">Track your business listings across key local directories.</p>
      <ul className="space-y-2">
        {mockCitations.map(citation => (
          <li key={citation.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
            <span className="font-medium text-gray-800">{citation.name}</span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[citation.status]}`}>
              {citation.status}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default CitationMonitor;
