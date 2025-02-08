import React from 'react';

const Grid = ({ guesses, currentGuess, word }) => {
  const empties = Array(6 - (guesses.length + 1)).fill('');
  
  const getLetterClass = (letter, index, guess) => {
    const baseClass = 'w-14 h-14 border-2 flex items-center justify-center mx-0.5 text-2xl font-bold';
    
    if (!letter) return `${baseClass} border-gray-500`;
    
    if (guess) {
      if (letter === word[index]) return `${baseClass} bg-green-500 border-green-500`;
      if (word.includes(letter)) return `${baseClass} bg-yellow-500 border-yellow-500`;
      return `${baseClass} bg-gray-700 border-gray-700`;
    }
    
    return `${baseClass} border-gray-500 bg-transparent`;
  };

  return (
    <div className="grid grid-rows-6 gap-1 mb-4">
      {guesses.map((guess, i) => (
        <div key={i} className="flex justify-center">
          {guess.split('').map((letter, index) => (
            <div key={index} className={getLetterClass(letter, index, true)}>
              {letter}
            </div>
          ))}
        </div>
      ))}
      
      {guesses.length < 6 && (
        <div className="flex justify-center">
          {Array(5).fill('').map((_, index) => (
            <div 
              key={index} 
              className={getLetterClass(currentGuess[index], index)}
            >
              {currentGuess[index]}
            </div>
          ))}
        </div>
      )}
      
      {empties.map((_, i) => (
        <div key={i} className="flex justify-center">
          {Array(5).fill('').map((_, index) => (
            <div key={index} className="w-14 h-14 border-2 border-gray-500 mx-0.5" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
