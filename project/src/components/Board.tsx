import React from 'react';
import { Crown } from 'lucide-react';

interface BoardProps {
  size: number;
  queens: number[];
  onQueenPlacement: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ size, queens, onQueenPlacement }) => {
  return (
    <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {Array(size).fill(null).map((_, row) => (
          Array(size).fill(null).map((_, col) => {
            const isQueen = queens[row] === col;
            const cellColor = (row + col) % 2 === 0 ? 'bg-purple-300/20' : 'bg-purple-500/20';
            
            return (
              <button
                key={`${row}-${col}`}
                onClick={() => onQueenPlacement(row, col)}
                className={`
                  w-12 h-12 md:w-16 md:h-16 flex items-center justify-center
                  ${cellColor}
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
  );
};

export default Board;