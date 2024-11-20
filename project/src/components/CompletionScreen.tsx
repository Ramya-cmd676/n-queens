import React, { useEffect, useState } from 'react';
import { Trophy, Clock, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompletionScreenProps {
  totalTime: number;
  totalPoints: number;
  onRestart: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  totalTime,
  totalPoints,
  onRestart,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setShow(true);

    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const runAnimation = () => {
      const timeLeft = animationEnd - Date.now();

      const particleCount = 50;
      confetti({
        particleCount,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'],
        angle: randomInRange(55, 125),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(runAnimation);
      }
    };

    runAnimation();
  }, []);

  return (
    <div className={`
      fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm
      transition-opacity duration-1000
      ${show ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className={`
        bg-gradient-to-br from-purple-900 to-indigo-900
        p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4
        transform transition-transform duration-1000
        ${show ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'}
      `}>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
            Congratulations!
          </h2>
          
          <p className="text-lg text-gray-200">
            You've mastered all levels of the N-Queens puzzle!
          </p>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-white/10 p-4 rounded-lg">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalPoints}</div>
              <div className="text-sm text-gray-300">Total Points</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalTime}s</div>
              <div className="text-sm text-gray-300">Total Time</div>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;