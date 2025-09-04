
import React from 'react';
import type { BusinessProfile } from '../types';
import { LogoutIcon } from './ui/icons';

interface HeaderProps {
  userProfile: BusinessProfile;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onLogout }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white border-b">
       <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center">
        <div className="flex items-center mr-6">
          <img className="w-10 h-10 rounded-full object-cover" src={userProfile.avatarUrl} alt={userProfile.name} />
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-800">{userProfile.name}</p>
            <p className="text-xs text-gray-500">{userProfile.type}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors"
          aria-label="Logout"
        >
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
