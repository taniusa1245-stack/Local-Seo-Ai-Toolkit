
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../ui/Card';
import { AnalyticsIcon } from '../ui/icons';
import { suggestKeywords } from '../../services/geminiService';
import { mockBusinessProfile } from '../../utils/mockData';
import Spinner from '../ui/Spinner';

const KeywordSuggestions: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKeywords = useCallback(async () => {
    setIsLoading(true);
    const suggested = await suggestKeywords(mockBusinessProfile.type, 'Sunnyvale');
    setKeywords(suggested);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  return (
    <Card title="AI Keyword Suggestions" icon={AnalyticsIcon}>
      <p className="text-sm mb-4">Discover new keywords to target for your business in Sunnyvale.</p>
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Spinner className="w-8 h-8 text-brand-blue" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span key={index} className="px-3 py-1.5 text-sm font-medium bg-blue-100 text-brand-blue rounded-full">
              {keyword}
            </span>
          ))}
        </div>
      )}
      <button 
        onClick={fetchKeywords}
        disabled={isLoading}
        className="mt-4 w-full text-sm bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center disabled:opacity-50"
      >
        {isLoading ? <Spinner className="w-4 h-4 text-gray-800" /> : 'Refresh Suggestions'}
      </button>
    </Card>
  );
};

export default KeywordSuggestions;
