import React, { useState, useEffect } from 'react';
import { Crown, ChevronRight } from 'lucide-react';
import { checkQueenPlacement, getConflicts } from '../utils/gameLogic';

interface GameBoardProps {
  level: number;
  size: number;
  onComplete: (timeSpent: number) => void;
  onNextLevel: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ level, size, onComplete, onNextLevel }) => {
  const [board, setBoard] = useState<number[]>(Array(size).fill(-1));
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());
  const [conflicts, setConflicts] = useState<Set<string>>(new Set());
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [autoTransition, setAutoTransition] = useState<boolean>(true);

  useEffect(() => {
    // Reset board when level changes
    setBoard(Array(size).fill(-1));
    setShowSuccess(false);
    setConflicts(new Set());
    setTransitionProgress(0);
    setAutoTransition(true);
  }, [level, size]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let animationFrameId: number;

    if (showSuccess && autoTransition) {
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 2000, 1);
        setTransitionProgress(progress);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          timeoutId = setTimeout(() => {
            onNextLevel();
          }, 100);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [showSuccess, autoTransition, onNextLevel]);

  const handleQueenPlacement = (row: number, col: number) => {
    if (showSuccess) return;

    const newBoard = [...board];
    
    if (newBoard[row] === col) {
      newBoard[row] = -1;
    } else {
      newBoard[row] = col;
    }
    
    setBoard(newBoard);
    setConflicts(getConflicts(newBoard));

    if (checkQueenPlacement(newBoard)) {
      const time = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(time);
      setShowSuccess(true);
      onComplete(time);
    }
  };

  const handleNextLevel = () => {
    setAutoTransition(false);
    onNextLevel();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Level {level + 1}</h2>
      <div className="relative">
        <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
            {Array(size).fill(null).map((_, row) => (
              Array(size).fill(null).map((_, col) => {
                const isQueen = board[row] === col;
                const hasConflict = conflicts.has(`${row},${col}`);
                const cellColor = (row + col) % 2 === 0 ? 'bg-purple-300/20' : 'bg-purple-500/20';
                
                return (
                  <button
                    key={`${row}-${col}`}
                    onClick={() => handleQueenPlacement(row, col)}
                    className={`
                      w-12 h-12 md:w-16 md:h-16 flex items-center justify-center
                      ${cellColor}
                      ${hasConflict ? 'bg-red-500/30' : ''}
                      hover:bg-purple-400/30 transition-colors
                      ${isQueen ? 'ring-2 ring-yellow-400' : ''}
                    `}
                  >
                    {isQueen && <Crown className="w-8 h-8 text-yellow-400" />}
                  </button>
                );
              })
            ))}
          </div>
        </div>
        
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg backdrop-blur-sm">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Level Complete!</h3>
              <p className="text-lg">Time: {timeSpent}s</p>
              <p className="text-lg">+12 points</p>
              <div className="relative w-48 h-12 mx-auto overflow-hidden">
                <button
                  onClick={handleNextLevel}
                  className="w-full h-full bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors relative z-10"
                >
                  <span>Next Level</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                {autoTransition && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-purple-400/20"
                    style={{ 
                      width: `${transitionProgress * 100}%`,
                      transition: 'width 2s linear'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white/10 rounded-xl p-6 backdrop-blur-sm w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Level {level + 1} Instructions</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Place {size} queens on the {size}x{size} board</li>
          <li>Red highlights show attacking positions</li>
          <li>Solve as quickly as possible!</li>
        </ul>
      </div>
    </div>
  );
};

export default GameBoard;