import React from 'react';

const Keyboard = ({ onKeyPress, usedKeys }) => {
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['Enter', ...'ZXCVBNM'.split(''), 'Backspace']
  ];

  const getKeyClass = (key) => {
    const baseClass = 'p-2 m-0.5 rounded font-bold';
    if (!usedKeys[key]) return `${baseClass} bg-gray-400`;
    if (usedKeys[key] === 'correct') return `${baseClass} bg-green-500`;
    if (usedKeys[key] === 'present') return `${baseClass} bg-yellow-500`;
    return `${baseClass} bg-gray-700`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-2">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyClass(key)}
              style={{ minWidth: key.length > 1 ? '4.5rem' : '2.5rem' }}
            >
              {key === 'Backspace' ? '←' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
