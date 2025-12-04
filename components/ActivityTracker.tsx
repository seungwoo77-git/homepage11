import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

interface ActivityTrackerProps {
  category: string;
  activities: string[];
  themeColor: string;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ category, activities, themeColor }) => {
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);

  // Reset completion state when category changes
  useEffect(() => {
    setCompletedIndices([]);
  }, [category]);

  const toggleActivity = (index: number) => {
    setCompletedIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const progress = Math.round((completedIndices.length / activities.length) * 100) || 0;
  
  // Dynamic style classes based on theme color
  const colorClass = themeColor.replace('text-', 'bg-').replace('600', '500');
  const lightColorClass = themeColor.replace('text-', 'bg-').replace('600', '50');
  const borderColorClass = themeColor.replace('text-', 'border-').replace('600', '200');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`font-bold text-lg text-gray-800`}>오늘의 미션</h3>
          <p className="text-gray-500 text-sm mt-1">작은 성취가 큰 변화를 만듭니다</p>
        </div>
        <div className={`flex flex-col items-end`}>
          <span className={`text-2xl font-bold ${themeColor}`}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-gray-100 rounded-full mb-8 overflow-hidden relative">
        <div 
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Activity List */}
      <div className="flex-1 space-y-3">
        {activities.map((activity, idx) => {
          const isCompleted = completedIndices.includes(idx);
          return (
            <div 
              key={idx}
              onClick={() => toggleActivity(idx)}
              className={`
                group flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none
                ${isCompleted 
                  ? `bg-gray-50 border-gray-100` 
                  : `bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm`
                }
              `}
            >
              <div className={`
                flex-shrink-0 transition-colors duration-200 transform group-hover:scale-110
                ${isCompleted ? 'text-gray-400' : 'text-gray-300 group-hover:text-gray-400'}
              `}>
                {isCompleted ? (
                  <CheckCircle2 className={`w-6 h-6 ${themeColor}`} />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              <span className={`
                font-medium transition-all duration-200
                ${isCompleted ? 'text-gray-400 line-through decoration-gray-400' : 'text-gray-700'}
              `}>
                {activity}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Completion Message */}
      {progress === 100 && (
        <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 ${lightColorClass} ${borderColorClass} border`}>
          <div className={`p-2 rounded-full bg-white shadow-sm ${themeColor}`}>
            <Trophy size={20} />
          </div>
          <div>
            <p className={`font-bold text-sm ${themeColor}`}>목표 달성 완료!</p>
            <p className="text-xs text-gray-600 mt-0.5">정말 훌륭해요! 내일도 함께해요.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracker;