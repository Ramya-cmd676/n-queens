import React from 'react';
import { Lock, CheckCircle, Clock } from 'lucide-react';

interface LevelSelectProps {
  level: number;
  size: number;
  points: number;
  completed: boolean;
  locked: boolean;
  active: boolean;
  bestTime?: number;
  onClick: () => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({
  level,
  size,
  points,
  completed,
  locked,
  active,
  bestTime,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`
        w-full p-4 rounded-lg flex items-center justify-between
        ${active ? 'bg-purple-500/50' : 'bg-white/5'}
        ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500/30'}
        transition-colors
      `}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          {locked ? (
            <Lock className="w-4 h-4" />
          ) : completed ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <span>{level}</span>
          )}
        </div>
        <div className="text-left">
          <div className="font-medium">Level {level}</div>
          <div className="text-sm text-gray-300">
            {size}x{size} board
            {bestTime && (
              <span className="ml-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {bestTime}s
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="text-yellow-400 font-medium">{points}p</div>
    </button>
  );
};

export default LevelSelect;