
import React from 'react';
import { CompassIcon, DashboardIcon, ReviewIcon, PostIcon, AnalyticsIcon, SettingsIcon } from './ui/icons';
import type { ActiveView } from '../types';
import { ActiveView as ActiveViewEnum } from '../types';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { view: ActiveViewEnum.Dashboard, label: 'Dashboard', icon: DashboardIcon },
    { view: ActiveViewEnum.Reviews, label: 'Reviews', icon: ReviewIcon },
    { view: ActiveViewEnum.Posts, label: 'Posts', icon: PostIcon },
    { view: ActiveViewEnum.Analytics, label: 'Analytics', icon: AnalyticsIcon },
    { view: ActiveViewEnum.Settings, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-20 border-b">
        <CompassIcon className="w-10 h-10 text-brand-blue" />
        <span className="ml-2 text-xl font-bold text-gray-800">Local SEO AI</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-col pt-6">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex items-center w-full px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200 ${
                activeView === item.view ? 'bg-gray-200 text-gray-900 border-r-4 border-brand-blue' : ''
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="mx-4 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
