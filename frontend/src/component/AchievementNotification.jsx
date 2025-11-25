import { useEffect } from 'react';
import { X, Trophy, Star, Award, Zap } from 'lucide-react';

export default function AchievementNotification({ achievement, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'level_up':
        return <Trophy className="w-8 h-8" />;
      case 'badge':
        return <Award className="w-8 h-8" />;
      case 'milestone':
        return <Star className="w-8 h-8" />;
      case 'combo':
        return <Zap className="w-8 h-8" />;
      default:
        return <Trophy className="w-8 h-8" />;
    }
  };

  const getGradient = (type) => {
    switch (type) {
      case 'level_up':
        return 'from-purple-500 to-indigo-600';
      case 'badge':
        return 'from-yellow-500 to-orange-600';
      case 'milestone':
        return 'from-pink-500 to-red-600';
      case 'combo':
        return 'from-cyan-500 to-blue-600';
      default:
        return 'from-indigo-500 to-purple-600';
    }
  };

  return (
    <div className={`fixed top-6 right-6 animate-popIn z-50 group cursor-pointer`}>
      <div className={`bg-gradient-to-br ${getGradient(achievement.type)} rounded-2xl shadow-2xl p-6 text-white transform transition-all duration-300 hover:scale-105 min-w-[320px]`}>
        {/* Decorative background */}
        <div className="absolute inset-0 rounded-2xl opacity-20 animate-pulse" style={{
          background: `radial-gradient(circle at 30% 30%, white 0%, transparent 80%)`
        }} />
        
        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
              {getAchievementIcon(achievement.type)}
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-1">
            {achievement.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/90 mb-4">
            {achievement.description}
          </p>

          {/* Reward info */}
          {achievement.points && (
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur rounded-lg">
              <Zap size={16} className="text-yellow-300" />
              <span className="font-semibold">+{achievement.points} poin</span>
            </div>
          )}
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border border-white/30 animate-pulse pointer-events-none" />
      </div>

      {/* Slide out animation trigger */}
      <style jsx>{`
        @keyframes slideOutRight {
          to {
            transform: translateX(450px);
            opacity: 0;
          }
        }
        .animate-slideOutRight {
          animation: slideOutRight 0.5s ease-in-out forwards;
          animation-delay: 3.5s;
        }
      `}</style>

      <div className="animate-slideOutRight" style={{ pointerEvents: 'none' }} />
    </div>
  );
}
