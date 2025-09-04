
import React, { useState } from 'react';
import Card from '../ui/Card';
import { PostIcon } from '../ui/icons';
import { generateGmbPost } from '../../services/geminiService';
import { mockBusinessProfile } from '../../utils/mockData';
import Spinner from '../ui/Spinner';

const PostGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePost = async () => {
    if (!topic) return;
    setIsLoading(true);
    const post = await generateGmbPost(mockBusinessProfile.name, mockBusinessProfile.type, topic);
    setGeneratedPost(post);
    setIsLoading(false);
  };

  return (
    <Card title="Auto GMB Post Generator" icon={PostIcon}>
      <div className="space-y-4">
        <div>
          <label htmlFor="post-topic" className="block text-sm font-medium text-gray-700">
            What is this post about? (e.g., "Weekly special", "New product")
          </label>
          <input
            type="text"
            id="post-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic..."
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
          />
        </div>

        <button
          onClick={handleGeneratePost}
          disabled={!topic || isLoading}
          className="w-full bg-brand-blue text-white py-2 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors flex items-center justify-center disabled:bg-gray-400"
        >
          {isLoading ? <Spinner /> : 'Generate Post'}
        </button>

        {generatedPost && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Generated Post Preview:</h4>
            <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap text-sm">
                {generatedPost}
            </div>
             <button
                className="mt-3 w-full bg-brand-green text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
                Post to GMB
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostGenerator;
