import React, { createContext, useContext, useState, useCallback } from 'react';

const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const [achievements, setAchievements] = useState([]);

  const showAchievement = useCallback((achievement) => {
    const id = Date.now();
    const fullAchievement = { ...achievement, id };
    
    setAchievements(prev => [...prev, fullAchievement]);

    // Auto remove after animation
    setTimeout(() => {
      setAchievements(prev => prev.filter(a => a.id !== id));
    }, 4500);

    return id;
  }, []);

  const removeAchievement = useCallback((id) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  }, []);

  const triggerLevelUp = useCallback((newLevel) => {
    showAchievement({
      type: 'level_up',
      title: `Level ${newLevel} Unlocked!`,
      description: `Selamat! Anda naik ke level ${newLevel}`,
      points: 50
    });
  }, [showAchievement]);

  const triggerBadge = useCallback((badgeName, description) => {
    showAchievement({
      type: 'badge',
      title: `Badge Diraih: ${badgeName}`,
      description: description,
      points: 25
    });
  }, [showAchievement]);

  const triggerMilestone = useCallback((milestone) => {
    showAchievement({
      type: 'milestone',
      title: 'Milestone Tercapai!',
      description: milestone,
      points: 100
    });
  }, [showAchievement]);

  const triggerPoints = useCallback((points, action) => {
    showAchievement({
      type: 'points',
      title: `+${points} Poin!`,
      description: action,
      points: points
    });
  }, [showAchievement]);

  const value = {
    achievements,
    showAchievement,
    removeAchievement,
    triggerLevelUp,
    triggerBadge,
    triggerMilestone,
    triggerPoints
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
};
