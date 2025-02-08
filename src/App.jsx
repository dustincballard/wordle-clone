import React, { useState, useEffect } from 'react';
import { WORDS } from './words';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import toast from 'react-hot-toast';

function App() {
  const [word] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      
      if (e.key === 'Enter') {
        if (currentGuess.length !== 5) {
          toast.error('Word must be 5 letters!');
          return;
        }
        
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');
        
        // Update used keys
        const newUsedKeys = {...usedKeys};
        currentGuess.split('').forEach((letter, i) => {
          if (letter === word[i]) {
            newUsedKeys[letter] = 'correct';
          } else if (word.includes(letter)) {
            if (newUsedKeys[letter] !== 'correct') {
              newUsedKeys[letter] = 'present';
            }
          } else {
            if (!newUsedKeys[letter]) {
              newUsedKeys[letter] = 'absent';
            }
          }
        });
        setUsedKeys(newUsedKeys);
        
        if (currentGuess === word) {
          toast.success('You won!');
          setGameOver(true);
        } else if (newGuesses.length === 6) {
          toast.error(`Game Over! The word was ${word}`);
          setGameOver(true);
        }
      }
      
      if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
        return;
      }
      
      if (currentGuess.length >= 5) return;
      
      if (e.key.match(/^[a-zA-Z]$/)) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver, guesses, word, usedKeys]);

  const handleKeyPress = (key) => {
    if (gameOver) return;
    
    if (key === 'Enter') {
      if (currentGuess.length !== 5) {
        toast.error('Word must be 5 letters!');
        return;
      }
      
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');
      
      // Update used keys
      const newUsedKeys = {...usedKeys};
      currentGuess.split('').forEach((letter, i) => {
        if (letter === word[i]) {
          newUsedKeys[letter] = 'correct';
        } else if (word.includes(letter)) {
          if (newUsedKeys[letter] !== 'correct') {
            newUsedKeys[letter] = 'present';
          }
        } else {
          if (!newUsedKeys[letter]) {
            newUsedKeys[letter] = 'absent';
          }
        }
      });
      setUsedKeys(newUsedKeys);
      
      if (currentGuess === word) {
        toast.success('You won!');
        setGameOver(true);
      } else if (newGuesses.length === 6) {
        toast.error(`Game Over! The word was ${word}`);
        setGameOver(true);
      }
    } else if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="min-h-screen text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Wordle Clone</h1>
      <Grid guesses={guesses} currentGuess={currentGuess} word={word} />
      <Keyboard onKeyPress={handleKeyPress} usedKeys={usedKeys} />
    </div>
  );
}

export default App;
