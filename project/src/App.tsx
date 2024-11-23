import React, { useState } from 'react';
import { Crown, Trophy, Clock } from 'lucide-react';
import LevelSelect from './components/LevelSelect';
import GameBoard from './components/GameBoard';
import CompletionScreen from './components/CompletionScreen';

export type Level = {
  size: number;
  completed: boolean;
  points: number;
  bestTime?: number;
};

function App() {
  const [levels, setLevels] = useState<Level[]>([
    { size: 4, completed: false, points: 12 },
    { size: 5, completed: false, points: 12 },
    { size: 6, completed: false, points: 12 },
    { size: 7, completed: false, points: 12 },
    { size: 8, completed: false, points: 12 },
  ]);

  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleLevelComplete = (levelIndex: number, timeSpent: number) => {
    const updatedLevels = [...levels];
    updatedLevels[levelIndex] = {
      ...updatedLevels[levelIndex],
      completed: true,
      bestTime: timeSpent,
    };
    setLevels(updatedLevels);
    setTotalPoints(prev => prev + levels[levelIndex].points);
    setTotalTime(prev => prev + timeSpent);

    if (levelIndex === levels.length - 1) {
      setShowCompletion(true);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel !== null && currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handleRestart = () => {
    setLevels(levels.map(level => ({ ...level, completed: false, bestTime: undefined })));
    setTotalPoints(0);
    setTotalTime(0);
    setCurrentLevel(null);
    setShowCompletion(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <a>https://social.nisb.in/Condensed---Black-Circle.c3214b41.png</a>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CTRL+ALT+FUN
              </h1>
              <p className="text-sm text-gray-300">N-Queens Challenge</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-semibold">{totalTime}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xl font-semibold">{totalPoints} points</span>
            </div>
          </div>
        </div>

        {showCompletion ? (
          <CompletionScreen
            totalTime={totalTime}
            totalPoints={totalPoints}
            onRestart={handleRestart}
          />
        ) : currentLevel === null ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-6">Select a Level</h2>
              <div className="space-y-3">
                {levels.map((level, index) => (
                  <LevelSelect
                    key={index}
                    level={index + 1}
                    size={level.size}
                    points={level.points}
                    completed={level.completed}
                    locked={index > 0 && !levels[index - 1].completed}
                    active={index === currentLevel}
                    bestTime={level.bestTime}
                    onClick={() => index === 0 || levels[index - 1].completed ? setCurrentLevel(index) : null}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">How to Play</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-200">
                <li>Select a level to begin</li>
                <li>Place queens on the board so they don't attack each other</li>
                <li>Queens can move horizontally, vertically, and diagonally</li>
                <li>Red highlights show conflicting positions</li>
                <li>Complete each level to unlock the next</li>
                <li>Try to solve each puzzle as quickly as possible</li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setCurrentLevel(null)}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <span className="text-sm">Back to Levels</span>
            </button>
            <GameBoard
              level={currentLevel}
              size={levels[currentLevel].size}
              onComplete={(time) => handleLevelComplete(currentLevel, time)}
              onNextLevel={handleNextLevel}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;