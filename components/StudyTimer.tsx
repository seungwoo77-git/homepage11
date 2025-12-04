import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Check, Brain, Coffee } from 'lucide-react';

type TimerMode = 'FOCUS' | 'REST';

const StudyTimer: React.FC = () => {
  // Config state (in minutes for easy editing)
  const [focusDuration, setFocusDuration] = useState(50);
  const [restDuration, setRestDuration] = useState(10);

  // Timer logic state
  const [mode, setMode] = useState<TimerMode>('FOCUS');
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Sync timeLeft when config changes (if not active)
  useEffect(() => {
    if (!isActive && !isEditing) {
      setTimeLeft(mode === 'FOCUS' ? focusDuration * 60 : restDuration * 60);
    }
  }, [focusDuration, restDuration, mode]);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Automatically switch modes logic
      const nextMode = mode === 'FOCUS' ? 'REST' : 'FOCUS';
      setMode(nextMode);
      setTimeLeft(nextMode === 'FOCUS' ? focusDuration * 60 : restDuration * 60);
      // Optional: Play sound here
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, focusDuration, restDuration]);

  const handleStart = () => {
    setIsActive(true);
    setIsEditing(false);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(mode === 'FOCUS' ? focusDuration * 60 : restDuration * 60);
  };

  const toggleMode = () => {
    setIsActive(false);
    const nextMode = mode === 'FOCUS' ? 'REST' : 'FOCUS';
    setMode(nextMode);
    // Explicitly set time for instant feedback
    setTimeLeft(nextMode === 'FOCUS' ? focusDuration * 60 : restDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Progress calculation
  const totalTime = (mode === 'FOCUS' ? focusDuration : restDuration) * 60;
  const safeTotal = totalTime || 1; 
  const progress = isEditing ? 0 : ((safeTotal - timeLeft) / safeTotal) * 100;

  // Visual constants
  const isFocus = mode === 'FOCUS';
  const themeColor = isFocus ? 'text-blue-600' : 'text-emerald-600';
  const strokeColor = isFocus ? '#2563eb' : '#10b981';
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center h-full min-h-[450px]">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                {isFocus ? <Brain className="w-5 h-5 text-blue-500"/> : <Coffee className="w-5 h-5 text-emerald-500"/>}
                <span className={`font-bold text-lg ${themeColor}`}>
                    {isFocus ? '집중 모드' : '휴식 모드'}
                </span>
            </div>
            {!isEditing && !isActive && (
                <button 
                    onClick={() => setIsEditing(true)} 
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="설정"
                >
                    <Settings className="w-5 h-5" />
                </button>
            )}
        </div>

        {/* Timer Display / Circle */}
        <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center mb-8">
            {/* SVG Circle with viewBox to prevent clipping */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
                {/* Background Track */}
                <circle
                    cx="140"
                    cy="140"
                    r="120"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                    fill="transparent"
                />
                {/* Progress Indicator */}
                {!isEditing && (
                    <circle
                        cx="140"
                        cy="140"
                        r="120"
                        stroke={strokeColor}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 120}
                        strokeDashoffset={2 * Math.PI * 120 * (1 - (timeLeft / safeTotal))}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                )}
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {isEditing ? (
                    <div className="flex flex-col gap-4 animate-in fade-in zoom-in duration-300 bg-white/90 p-6 rounded-xl backdrop-blur-sm z-10">
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <label className="text-xs font-bold text-blue-600 mb-1">집중 (분)</label>
                                <input 
                                    type="number" 
                                    value={focusDuration} 
                                    onChange={(e) => setFocusDuration(Math.max(1, parseInt(e.target.value) || 0))}
                                    className="w-16 text-center text-2xl font-bold border-b-2 border-blue-200 focus:border-blue-500 outline-none bg-transparent"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <label className="text-xs font-bold text-emerald-600 mb-1">휴식 (분)</label>
                                <input 
                                    type="number" 
                                    value={restDuration} 
                                    onChange={(e) => setRestDuration(Math.max(1, parseInt(e.target.value) || 0))}
                                    className="w-16 text-center text-2xl font-bold border-b-2 border-emerald-200 focus:border-emerald-500 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                setIsEditing(false);
                                setTimeLeft(mode === 'FOCUS' ? focusDuration * 60 : restDuration * 60);
                            }}
                            className="mt-2 flex items-center justify-center gap-1 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-black transition-colors w-full"
                        >
                            <Check size={16} />
                            설정 완료
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                         <div className={`text-6xl font-bold font-mono tracking-wider ${themeColor}`}>
                            {formatTime(timeLeft)}
                        </div>
                        <button 
                            onClick={toggleMode}
                            disabled={isActive}
                            className={`mt-4 text-sm font-medium px-4 py-1.5 rounded-full border transition-all
                                ${isActive 
                                    ? 'opacity-50 cursor-not-allowed border-transparent text-gray-400' 
                                    : 'border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50'
                                }
                            `}
                        >
                            {isFocus ? '휴식 모드로 변경' : '집중 모드로 변경'}
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full max-w-xs mt-auto">
             {!isActive ? (
                <button
                    onClick={handleStart}
                    disabled={isEditing}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold shadow-lg transform active:scale-95 transition-all
                        ${isEditing 
                            ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                            : isFocus ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'
                        }
                    `}
                >
                    <Play size={24} fill="currentColor" />
                    {timeLeft === safeTotal ? (isFocus ? '집중 시작' : '휴식 시작') : '계속하기'}
                </button>
            ) : (
                <button
                    onClick={handlePause}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all font-bold shadow-amber-200 shadow-lg active:scale-95"
                >
                    <Pause size={24} fill="currentColor" />
                    일시정지
                </button>
            )}

            <button
                onClick={handleReset}
                disabled={isEditing}
                className="p-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
                title="초기화"
            >
                <RotateCcw size={20} />
            </button>
        </div>
    </div>
  );
};

export default StudyTimer;