'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Object mapping keys to finger assignments
const keyToFinger = {
  // Left hand
  '`': 'pinky-l',
  '1': 'pinky-l',
  '2': 'ring-l',
  '3': 'middle-l',
  '4': 'index-l',
  '5': 'index-l',
  'q': 'pinky-l',
  'w': 'ring-l',
  'e': 'middle-l',
  'r': 'index-l',
  't': 'index-l',
  'a': 'pinky-l',
  's': 'ring-l',
  'd': 'middle-l',
  'f': 'index-l',
  'g': 'index-l',
  'z': 'pinky-l',
  'x': 'ring-l',
  'c': 'middle-l',
  'v': 'index-l',
  
  // Right hand
  '6': 'index-r',
  '7': 'index-r',
  '8': 'middle-r',
  '9': 'ring-r',
  '0': 'pinky-r',
  '-': 'pinky-r',
  '=': 'pinky-r',
  'y': 'index-r',
  'u': 'index-r',
  'i': 'middle-r',
  'o': 'ring-r',
  'p': 'pinky-r',
  '[': 'pinky-r',
  ']': 'pinky-r',
  '\\': 'pinky-r',
  'h': 'index-r',
  'j': 'index-r',
  'k': 'middle-r',
  'l': 'ring-r',
  ';': 'pinky-r',
  "'": 'pinky-r',
  'b': 'index-r',
  'n': 'index-r',
  'm': 'middle-r',
  ',': 'ring-r',
  '.': 'pinky-r',
  '/': 'pinky-r',
  
  // Thumbs
  ' ': 'thumb'
};

// Get finger color based on finger name
const getFingerColor = (fingerName) => {
  if (fingerName.includes('pinky')) return 'var(--finger-pinky)';
  if (fingerName.includes('ring')) return 'var(--finger-ring)';
  if (fingerName.includes('middle')) return 'var(--finger-middle)';
  if (fingerName.includes('index')) return 'var(--finger-index)';
  if (fingerName.includes('thumb')) return 'var(--finger-thumb)';
  return '#888';
};

// Standard QWERTY keyboard layout
const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Fn', 'Ctrl']
];

const KeyboardSVG = ({ 
  activeKey = null, 
  targetKey = null,
  showHints = true,
  animated = true,
  size = 'lg' 
}) => {
  const [pressedKeys, setPressedKeys] = useState({});
  const [keyboardWidth, setKeyboardWidth] = useState(800);
  const [keyboardHeight, setKeyboardHeight] = useState(250);
  
  // Responsive sizing based on the size prop
  useEffect(() => {
    switch (size) {
      case 'sm':
        setKeyboardWidth(500);
        setKeyboardHeight(160);
        break;
      case 'md':
        setKeyboardWidth(650);
        setKeyboardHeight(200);
        break;
      case 'lg':
        setKeyboardWidth(800);
        setKeyboardHeight(250);
        break;
      case 'xl':
        setKeyboardWidth(1000);
        setKeyboardHeight(300);
        break;
      default:
        setKeyboardWidth(800);
        setKeyboardHeight(250);
    }
  }, [size]);

  // Update pressed keys based on activeKey prop
  useEffect(() => {
    if (activeKey) {
      setPressedKeys(prev => ({
        ...prev,
        [activeKey.toLowerCase()]: true,
      }));
      
      // Remove the key after animation completes
      const timer = setTimeout(() => {
        setPressedKeys(prev => {
          const newState = { ...prev };
          delete newState[activeKey.toLowerCase()];
          return newState;
        });
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [activeKey]);

  // Calculate key dimensions
  const keyGap = keyboardWidth * 0.005; // 0.5% of keyboard width
  const rowHeight = (keyboardHeight - keyGap * 4) / 5;
  
  // Function to render keyboard rows and keys
  const renderKeyboard = () => {
    let yOffset = 0;
    
    return keyboardLayout.map((row, rowIndex) => {
      let xOffset = 0;
      const rowKeys = row.map((key, keyIndex) => {
        // Calculate key width based on special keys
        let keyWidth;
        switch (key) {
          case 'Backspace':
            keyWidth = keyboardWidth * 0.085;
            break;
          case 'Tab':
            keyWidth = keyboardWidth * 0.065;
            break;
          case 'Caps':
            keyWidth = keyboardWidth * 0.075;
            break;
          case 'Enter':
            keyWidth = keyboardWidth * 0.085;
            break;
          case 'Shift':
            keyWidth = rowIndex === 3 && keyIndex === 0 ? keyboardWidth * 0.09 : keyboardWidth * 0.11;
            break;
          case ' ':
            keyWidth = keyboardWidth * 0.3;
            break;
          case 'Ctrl':
          case 'Alt':
            keyWidth = keyboardWidth * 0.055;
            break;
          case 'Win':
          case 'Fn':
            keyWidth = keyboardWidth * 0.05;
            break;
          default:
            keyWidth = keyboardWidth * 0.045;
        }
        
        const isPressed = pressedKeys[key.toLowerCase()] || key.toLowerCase() === activeKey?.toLowerCase();
        const isTarget = key.toLowerCase() === targetKey?.toLowerCase();
        
        // Determine key styling
        const keyFill = isPressed 
          ? 'var(--key-pressed)' 
          : isTarget && showHints
          ? 'rgba(59, 130, 246, 0.2)' 
          : 'var(--key-bg)';
          
        const keyBorder = isTarget && showHints ? 'rgba(59, 130, 246, 0.8)' : 'var(--key-border)';
        const keyStrokeWidth = isTarget && showHints ? 2 : 1;
        
        // Find finger for this key (for single character keys)
        let fingerColor = null;
        if (key.length === 1 && showHints) {
          const finger = keyToFinger[key.toLowerCase()];
          if (finger) {
            fingerColor = getFingerColor(finger);
          }
        }
        
        // Create the key component
        const keyComponent = (
          <g key={`${rowIndex}-${keyIndex}`}>
            <motion.rect
              x={xOffset}
              y={yOffset}
              width={keyWidth}
              height={rowHeight}
              rx={4}
              fill={keyFill}
              stroke={keyBorder}
              strokeWidth={keyStrokeWidth}
              initial={animated && isTarget ? { scale: 1 } : {}}
              animate={animated && isTarget ? { 
                scale: [1, 1.05, 1],
                opacity: [1, 0.9, 1]
              } : {}}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop",
                duration: 2,
              }}
              {...(isPressed && animated && {
                animate: {
                  y: yOffset + 2,
                  boxShadow: 'none'
                },
                transition: { duration: 0.1 }
              })}
            />
            
            {/* Finger color indicator dot */}
            {fingerColor && (
              <circle
                cx={xOffset + keyWidth * 0.2}
                cy={yOffset + rowHeight * 0.2}
                r={keyboardWidth * 0.005}
                fill={fingerColor}
              />
            )}
            
            {/* Key label */}
            <text
              x={xOffset + keyWidth / 2}
              y={yOffset + rowHeight / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={key.length > 1 ? keyboardWidth * 0.012 : keyboardWidth * 0.02}
              fontFamily="var(--font-geist-sans), Arial"
              fontWeight={isTarget && showHints ? 'bold' : 'normal'}
              fill="var(--key-text)"
              className="select-none"
            >
              {key}
            </text>
          </g>
        );
        
        xOffset += keyWidth + keyGap;
        return keyComponent;
      });
      
      yOffset += rowHeight + keyGap;
      return <g key={`row-${rowIndex}`}>{rowKeys}</g>;
    });
  };

  return (
    <div className="w-full overflow-hidden keyboard-container">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${keyboardWidth} ${keyboardHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {renderKeyboard()}
      </svg>
    </div>
  );
};

export default KeyboardSVG;
