import React from 'react';
import Card from '../ui/Card';
import { mockBusinessProfile, mockCompetitors } from '../../utils/mockData';
import { AnalyticsIcon, StarIcon } from '../ui/icons';

const CompetitorMatrix: React.FC = () => {
  const allBusinesses = [
    { ...mockBusinessProfile, name: 'Your Business' },
    ...mockCompetitors
  ];

  return (
    <Card title="Competitor Matrix" icon={AnalyticsIcon}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Business</th>
              <th scope="col" className="px-6 py-3 text-center">Rating</th>
              <th scope="col" className="px-6 py-3 text-center">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {allBusinesses.map((biz, index) => (
              <tr key={index} className={`border-b ${biz.name === 'Your Business' ? 'bg-blue-50' : 'bg-white'}`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {biz.name}
                </th>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <StarIcon className="w-4 h-4 text-brand-yellow mr-1"/> {biz.rating.toFixed(1)}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{biz.reviewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CompetitorMatrix;
