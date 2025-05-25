'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingBox = ({
  text = '',
  onComplete = () => {},
  onProgress = () => {},
  showStats = true,
  difficulty = 'medium',
  timeLimit = 0, // 0 means no time limit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const typingAreaRef = useRef(null);
  
  // Function to calculate current WPM
  const calculateWPM = useCallback(() => {
    if (!startTime) return 0;
    
    const now = endTime || new Date().getTime();
    const timeElapsed = (now - startTime) / 60000; // convert to minutes
    const wordsTyped = currentIndex / 5; // standard WPM calculation (5 characters = 1 word)
    
    return Math.round(wordsTyped / timeElapsed);
  }, [startTime, endTime, currentIndex]);
  
  // Function to calculate accuracy
  const calculateAccuracy = useCallback(() => {
    if (currentIndex === 0) return 100;
    return Math.round(((currentIndex - mistakes.length) / currentIndex) * 100);
  }, [currentIndex, mistakes]);
  
  // Handle user typing
  const handleKeyDown = useCallback((e) => {
    // Prevent default actions for certain keys
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    
    if (isFinished) return;
    
    // Start the timer on first keystroke
    if (!startTime && /^[a-zA-Z0-9\s.,';:"\-=+!@#$%^&*()_+\[\]{}<>/?\\|]$/.test(e.key)) {
      setStartTime(new Date().getTime());
    }
    
    if (e.key === text[currentIndex]) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      
      // If this was the last character, end the session
      if (currentIndex === text.length - 1) {
        const now = new Date().getTime();
        setEndTime(now);
        setIsFinished(true);
        
        const finalWPM = calculateWPM();
        const finalAccuracy = calculateAccuracy();
        
        setWPM(finalWPM);
        setAccuracy(finalAccuracy);
        
        onComplete({
          wpm: finalWPM,
          accuracy: finalAccuracy,
          time: (now - startTime) / 1000, // seconds
          mistakes: mistakes.length,
          text
        });
      }
    } else if (/^[a-zA-Z0-9\s.,';:"\-=+!@#$%^&*()_+\[\]{}<>/?\\|]$/.test(e.key)) {
      // Only count as mistake if it's a regular typing character
      setMistakes(prev => [...prev, { index: currentIndex, expected: text[currentIndex], actual: e.key }]);
    }
    
    // Update progress for parent component tracking
    onProgress({
      progress: (currentIndex / text.length) * 100,
      wpm: calculateWPM(),
      accuracy: calculateAccuracy(),
    });
  }, [currentIndex, isFinished, startTime, text, calculateWPM, calculateAccuracy, mistakes, onComplete, onProgress]);
  
  // Reset to beginning of exercise
  const reset = () => {
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setMistakes([]);
    setIsFinished(false);
    setWPM(0);
    setAccuracy(100);
    setTimeRemaining(timeLimit);
    
    // Focus the container
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };
  
  // Timer for time-limited exercises
  useEffect(() => {
    let timer;
    if (startTime && timeLimit > 0 && !isFinished) {
      timer = setInterval(() => {
        const elapsed = Math.floor((new Date().getTime() - startTime) / 1000);
        const remaining = Math.max(0, timeLimit - elapsed);
        
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          setIsFinished(true);
          setEndTime(new Date().getTime());
          clearInterval(timer);
          
          const finalWPM = calculateWPM();
          const finalAccuracy = calculateAccuracy();
          
          setWPM(finalWPM);
          setAccuracy(finalAccuracy);
          
          onComplete({
            wpm: finalWPM,
            accuracy: finalAccuracy,
            time: timeLimit,
            mistakes: mistakes.length,
            text: text.substring(0, currentIndex)
          });
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [startTime, timeLimit, isFinished, calculateWPM, calculateAccuracy, mistakes, currentIndex, text, onComplete]);
  
  // Focus container div on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
    
    // Add event listener for document-wide keydown
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  // Scroll the typing area to keep the current character in view
  useEffect(() => {
    if (typingAreaRef.current) {
      const characters = typingAreaRef.current.querySelectorAll('.character');
      
      if (characters[currentIndex]) {
        characters[currentIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);

  return (
    <div 
      className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-4xl transition-all overflow-hidden"
      tabIndex={0}
      ref={containerRef}
      onFocus={() => inputRef.current?.focus()}
    >
      {/* Status bar with WPM, Accuracy and Timer */}
      {showStats && (
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="stats flex space-x-6">
            <div className="stat">
              <span className="text-gray-500 dark:text-gray-400">WPM</span>
              <span className="ml-2 font-bold">{wpm}</span>
            </div>
            <div className="stat">
              <span className="text-gray-500 dark:text-gray-400">Accuracy</span>
              <span 
                className={`ml-2 font-bold ${
                  accuracy > 90 
                    ? 'text-green-500' 
                    : accuracy > 70 
                    ? 'text-yellow-500' 
                    : 'text-red-500'
                }`}
              >
                {accuracy}%
              </span>
            </div>
            <div className="stat">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="ml-2 font-bold">
                {Math.round((currentIndex / text.length) * 100)}%
              </span>
            </div>
          </div>
          
          {timeLimit > 0 && (
            <div className="timer">
              <span className="text-gray-500 dark:text-gray-400">Time</span>
              <span className={`ml-2 font-bold ${timeRemaining < 10 ? 'text-red-500' : ''}`}>
                {timeRemaining}s
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Typing area */}
      <div 
        ref={typingAreaRef}
        className="typing-text p-4 bg-gray-50 dark:bg-gray-900 rounded-lg min-h-[100px] max-h-[300px] overflow-auto text-lg font-mono leading-relaxed"
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`character ${
              index === currentIndex 
                ? 'bg-blue-200 dark:bg-blue-900 animate-pulse' 
                : index < currentIndex 
                ? mistakes.find(m => m.index === index) 
                  ? 'text-red-500 dark:text-red-400' 
                  : 'text-green-600 dark:text-green-400' 
                : 'text-gray-800 dark:text-gray-300'
            }`}
          >
            {char === ' ' ? <>&nbsp;</> : char}
          </span>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / text.length) * 100}%` }}
          transition={{ type: 'tween' }}
        />
      </div>
      
      {/* Results overlay when finished */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 flex flex-col items-center justify-center p-6 rounded-lg z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Results</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="result-card p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">WPM</p>
                <p className="text-3xl font-bold">{wpm}</p>
              </div>
              
              <div className="result-card p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                <p 
                  className={`text-3xl font-bold ${
                    accuracy > 90 
                      ? 'text-green-500' 
                      : accuracy > 70 
                      ? 'text-yellow-500' 
                      : 'text-red-500'
                  }`}
                >
                  {accuracy}%
                </p>
              </div>
              
              <div className="result-card p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                <p className="text-3xl font-bold">
                  {Math.round((endTime - startTime) / 1000)}s
                </p>
              </div>
              
              <div className="result-card p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Mistakes</p>
                <p className={`text-3xl font-bold ${mistakes.length > 10 ? 'text-red-500' : 'text-yellow-500'}`}>
                  {mistakes.length}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={reset}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Next Exercise
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hidden input for mobile keyboard support */}
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute top-0 left-0 h-0 w-0"
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
};

export default TypingBox;
