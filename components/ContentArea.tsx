import React from 'react';
import { UserCategory, CategoryConfig } from '../types';
import StudyTimer from './StudyTimer';
import ActivityTracker from './ActivityTracker';
import { BookOpen, Home, Coffee, ExternalLink, ShieldCheck } from 'lucide-react';

interface ContentAreaProps {
  activeCategory: UserCategory;
}

const CATEGORY_CONFIGS: Record<UserCategory, CategoryConfig> = {
  [UserCategory.STUDY]: {
    id: UserCategory.STUDY,
    label: '공부',
    description: '목표를 향해 달려가는 당신을 위한 학습 관리 및 동기부여 공간입니다.',
    themeColor: 'text-blue-600',
    iconName: 'BookOpen',
    activities: [
      "집중 타이머로 50분 공부하기",
      "오늘의 영단어 30개 암기",
      "틀린 문제 오답노트 정리하기",
      "다음 주 학습 계획 세우기"
    ]
  },
  [UserCategory.RECLUSE]: {
    id: UserCategory.RECLUSE,
    label: '은둔형 외톨이',
    description: '작은 발걸음부터 시작하는 당신을 응원합니다. 안전하고 따뜻한 소통의 공간입니다.',
    themeColor: 'text-emerald-600',
    iconName: 'Home',
    activities: [
      "창문 열고 10분 환기하기",
      "가벼운 스트레칭 5분 하기",
      "오늘의 감정 일기 한 줄 쓰기",
      "좋아하는 음악 1곡 듣기"
    ]
  },
  [UserCategory.RESTING]: {
    id: UserCategory.RESTING,
    label: '쉬었음 세대',
    description: '잠시 멈춤은 더 멀리 가기 위한 준비입니다. 재충전과 새로운 도약을 지원합니다.',
    themeColor: 'text-amber-600',
    iconName: 'Coffee',
    activities: [
      "나의 장점 3가지 적어보기",
      "관심 있는 직무 영상 1개 시청",
      "동네 공원 30분 산책하기",
      "읽고 싶었던 책 10페이지 읽기"
    ]
  }
};

const ContentArea: React.FC<ContentAreaProps> = ({ activeCategory }) => {
  const config = CATEGORY_CONFIGS[activeCategory];

  const getIcon = () => {
    switch (config.iconName) {
      case 'BookOpen': return <BookOpen className="w-8 h-8 text-blue-500" />;
      case 'Home': return <Home className="w-8 h-8 text-emerald-500" />;
      case 'Coffee': return <Coffee className="w-8 h-8 text-amber-500" />;
      default: return null;
    }
  };

  const getGradient = () => {
     switch (activeCategory) {
      case UserCategory.STUDY: return "from-blue-50 to-indigo-50 border-blue-100";
      case UserCategory.RECLUSE: return "from-emerald-50 to-teal-50 border-emerald-100";
      case UserCategory.RESTING: return "from-amber-50 to-orange-50 border-amber-100";
      default: return "from-gray-50 to-gray-100";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className={`p-8 rounded-2xl bg-gradient-to-br ${getGradient()} border shadow-sm`}>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            {getIcon()}
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{config.label}</h2>
            <p className="text-gray-600 leading-relaxed">{config.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column Logic */}
        <div className="space-y-6">
          {activeCategory === UserCategory.STUDY ? (
            // Study Tab: Shows Timer
            <StudyTimer />
          ) : (
             // Other Tabs: Shows Policy/Support Info
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
              <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <ShieldCheck className={`w-5 h-5 ${config.themeColor}`} />
                지원 정책 및 정보
              </h3>
              
              <div className="space-y-4 flex-1">
                 <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                            {activeCategory === UserCategory.RECLUSE ? '청년 마음 건강 바우처' : '국민 내일배움카드'}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        {activeCategory === UserCategory.RECLUSE 
                            ? '전문 심리 상담 서비스를 이용할 수 있는 바우처를 제공합니다. 월 4회, 3개월간 지원됩니다.' 
                            : '직무 능력 향상을 위한 훈련비를 지원합니다. 온/오프라인 강의를 수강하고 새로운 커리어를 준비하세요.'}
                    </p>
                 </div>

                 <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                            {activeCategory === UserCategory.RECLUSE ? '은둔 고립 청년 지원 사업' : '청년 도약 계좌'}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        {activeCategory === UserCategory.RECLUSE 
                            ? '사회 복귀를 위한 맞춤형 프로그램을 제공합니다. 자조 모임, 취미 활동 지원 등을 확인해보세요.' 
                            : '매월 일정 금액을 납입하면 정부 기여금을 더해 목돈 마련을 돕는 정책 금융 상품입니다.'}
                    </p>
                 </div>
              </div>
            </div>
          )}
          
          {/* Study tab also gets Policy info below Timer if needed, 
              but for cleaner layout we might just keep Timer on left and Tracker on right.
              Let's add a small policy banner for Study tab below the timer if space permits, 
              or just rely on the user interface being clean.
          */}
        </div>

        {/* Right Column: Activity Tracker (Replaces AI) */}
        <div className="h-full">
          <ActivityTracker 
            category={activeCategory} 
            activities={config.activities}
            themeColor={config.themeColor}
          />
        </div>
      </div>
      
      {/* Footer Banner for Policies (Shown for Study tab to ensure content balance) */}
      {activeCategory === UserCategory.STUDY && (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <h4 className="font-bold text-gray-800 text-sm">학습 지원 정책이 궁금하신가요?</h4>
                <p className="text-xs text-gray-500 mt-1">온라인 무료 강의, 스터디 카페 이용권 지원 정보를 확인해보세요.</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                자세히 보기
            </button>
        </div>
      )}
    </div>
  );
};

export default ContentArea;