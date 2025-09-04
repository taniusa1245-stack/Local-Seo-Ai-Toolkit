
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../ui/Card';
import { ReviewIcon, StarIcon } from '../ui/icons';
import { mockReviews } from '../../utils/mockData';
import { analyzeReviewSentiment, generateReviewReply } from '../../services/geminiService';
import type { Review, Sentiment } from '../../types';
import Spinner from '../ui/Spinner';
import { mockBusinessProfile } from '../../utils/mockData';

const sentimentColors: Record<Sentiment, { bg: string, text: string, border: string }> = {
  Positive: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-400' },
  Neutral: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-400' },
  Negative: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-400' },
};

const ReviewItem: React.FC<{ review: Review, onGenerateReply: (id: string) => void }> = ({ review, onGenerateReply }) => (
  <div className="py-4 border-b last:border-b-0">
    <div className="flex items-start">
      <img src={review.authorAvatar} alt={review.author} className="w-10 h-10 rounded-full mr-4" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h5 className="font-semibold text-gray-800">{review.author}</h5>
          <span className="text-xs text-gray-500">{review.timestamp}</span>
        </div>
        <div className="flex items-center my-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-brand-yellow' : 'text-gray-300'}`} />
          ))}
        </div>
        <p className="text-sm text-gray-700 mt-1">{review.text}</p>
        
        {review.sentiment && (
          <div className="mt-3 flex items-center flex-wrap gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${sentimentColors[review.sentiment].bg} ${sentimentColors[review.sentiment].text}`}>{review.sentiment}</span>
            {review.themes?.map(theme => (
                <span key={theme} className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">{theme}</span>
            ))}
          </div>
        )}

        {review.reply ? (
          <div className="mt-3 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm font-semibold text-gray-800">Your reply:</p>
            <p className="text-sm text-gray-600 italic">{review.reply}</p>
          </div>
        ) : (
          <button 
            onClick={() => onGenerateReply(review.id)}
            disabled={review.isGeneratingReply}
            className="mt-3 text-sm bg-brand-blue text-white py-1.5 px-3 rounded-lg hover:bg-brand-blue-dark transition-colors flex items-center justify-center disabled:bg-gray-400"
          >
            {review.isGeneratingReply ? <Spinner className="w-4 h-4" /> : "Generate Reply"}
          </button>
        )}
      </div>
    </div>
  </div>
);

const ReviewAnalysis: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const analyzeAllReviews = useCallback(() => {
    reviews.forEach(async (review) => {
      if (!review.sentiment) {
        const analysis = await analyzeReviewSentiment(review.text);
        setReviews(prev => prev.map(r => r.id === review.id ? { ...r, sentiment: analysis.sentiment, themes: analysis.themes } : r));
      }
    });
  }, [reviews]);

  useEffect(() => {
    analyzeAllReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerateReply = async (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, isGeneratingReply: true } : r));
    const reviewToReply = reviews.find(r => r.id === reviewId);
    if (reviewToReply) {
      const replyText = await generateReviewReply(mockBusinessProfile.name, reviewToReply.text);
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, reply: replyText, isGeneratingReply: false } : r));
    }
  };

  return (
    <Card title="GMB Review Analysis & Reply" icon={ReviewIcon}>
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review} onGenerateReply={handleGenerateReply} />
      ))}
    </Card>
  );
};

export default ReviewAnalysis;
