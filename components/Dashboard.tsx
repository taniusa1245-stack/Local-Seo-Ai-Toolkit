
import React, { useState } from 'react';
import { mockBusinessProfile } from '../utils/mockData';
import Sidebar from './Sidebar';
import Header from './Header';
import RankTracker from './widgets/RankTracker';
import ReviewAnalysis from './widgets/ReviewAnalysis';
import PostGenerator from './widgets/PostGenerator';
import KeywordSuggestions from './widgets/KeywordSuggestions';
import CompetitorMatrix from './widgets/CompetitorMatrix';
import CitationMonitor from './widgets/CitationMonitor';
import AIVisibility from './widgets/AIVisibility';
import QandA from './widgets/QandA';
import type { ActiveView } from '../types';
import { ActiveView as ActiveViewEnum } from '../types';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState<ActiveView>(ActiveViewEnum.Dashboard);

  const renderContent = () => {
    switch (activeView) {
      case ActiveViewEnum.Reviews:
        return <div key="reviews" className="animate-fade-in"><ReviewAnalysis /></div>;
      case ActiveViewEnum.Posts:
        return <div key="posts" className="animate-fade-in"><PostGenerator /></div>;
      // Add cases for other views if they need a dedicated page
      default:
        return (
          <div key="dashboard" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2">
              <RankTracker />
            </div>
            <AIVisibility />
            <div className="lg:col-span-3">
              <ReviewAnalysis />
            </div>
            <div className="lg:col-span-1">
              <PostGenerator />
            </div>
            <div className="lg:col-span-2">
               <QandA />
            </div>
            <KeywordSuggestions />
            <CompetitorMatrix />
            <CitationMonitor />
          </div>
        );
    }
  };


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userProfile={mockBusinessProfile} onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;