import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function UserCard({ user, size = 'default', clickable = true }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate(`/profile/${user._id}`);
    }
  };

  const sizeClasses = {
    small: {
      avatar: 'w-8 h-8 text-xs',
      name: 'text-sm',
      level: 'text-xs'
    },
    default: {
      avatar: 'w-12 h-12 text-base',
      name: 'text-base',
      level: 'text-sm'
    },
    large: {
      avatar: 'w-16 h-16 text-lg',
      name: 'text-lg',
      level: 'text-base'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
        clickable 
          ? 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800' 
          : ''
      } border border-transparent`}
    >
      {/* Avatar */}
      <div className={`${classes.avatar} bg-gradient-to-br from-indigo-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-md`}>
        {user.name?.charAt(0)?.toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`${classes.name} font-semibold text-gray-900 dark:text-white line-clamp-1`}>
          {user.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`${classes.level} text-gray-600 dark:text-gray-400`}>
            Level {user.level}
          </span>
          <span className="text-yellow-500">⭐ {user.points || 0}</span>
        </div>
      </div>

      {/* Arrow */}
      {clickable && (
        <ArrowRight className="text-gray-400 dark:text-gray-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" size={18} />
      )}
    </div>
  );
}
