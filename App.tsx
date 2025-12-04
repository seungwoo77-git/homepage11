import React, { useState } from 'react';
import { UserCategory } from './types';
import ContentArea from './components/ContentArea';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserCategory>(UserCategory.STUDY);

  const renderTabButton = (category: UserCategory, label: string) => {
    const isActive = activeTab === category;
    return (
      <button
        onClick={() => setActiveTab(category)}
        className={`
          relative flex-1 py-4 text-sm font-semibold transition-all duration-300 outline-none
          ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}
        `}
      >
        <span className="relative z-10">{label}</span>
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full layout-id='active-indicator'" />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header Container */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              청년이음
            </h1>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex items-center gap-8 -mb-[1px]">
            {renderTabButton(UserCategory.STUDY, '공부')}
            {renderTabButton(UserCategory.RECLUSE, '은둔형 외톨이')}
            {renderTabButton(UserCategory.RESTING, '쉬었음 세대')}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ContentArea activeCategory={activeTab} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-xs">
            © 2025 청년 맞춤 지원 플랫폼. All rights reserved. <br/>
            여러분의 새로운 시작을 응원합니다.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;