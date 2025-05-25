'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import TypingBox from '@/components/practice/TypingBox';
import KeyboardSVG from '@/components/keyboard/KeyboardSVG';
import useTypingStore from '@/lib/store';

// Sample practice texts for each mode
const practiceTexts = {
  paragraph: [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet. Typing practice is essential for improving speed and accuracy. Keep your eyes on the screen, not on your fingers. With consistent practice, you'll become a proficient typist in no time.",
    "Learning to type without looking at the keyboard is a valuable skill. It increases productivity and reduces errors. Your fingers should rest on the home row keys: A, S, D, F for your left hand, and J, K, L, ; for your right hand. This natural position allows you to reach all other keys efficiently.",
    "Effective typing involves rhythm and muscle memory. As you practice, your brain creates neural pathways that allow your fingers to find keys automatically. Focus on accuracy first, then speed will naturally follow. Remember to take short breaks to prevent fatigue and strain on your wrists."
  ],
  code: [
    `function calculateSum(array) {
  return array.reduce((sum, current) => {
    return sum + current;
  }, 0);
}

const numbers = [1, 2, 3, 4, 5];
const sum = calculateSum(numbers);
console.log(\`The sum is \${sum}\`);`,
    `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, my name is \${this.name} and I'm \${this.age} years old.\`;
  }
  
  static createAnonymous() {
    return new Person("Anonymous", 0);
  }
}`
  ],
  quotes: [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "It always seems impossible until it's done. – Nelson Mandela",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. – Nelson Mandela",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt"
  ],
  custom: ""
};

export default function Practice() {
  const [practiceMode, setPracticeMode] = useState('paragraph');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [customText, setCustomText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  
  // Get current practice text
  const getCurrentText = () => {
    if (practiceMode === 'custom') {
      return customText || "Type your custom text here...";
    } else {
      const texts = practiceTexts[practiceMode];
      return texts[currentTextIndex % texts.length];
    }
  };
  
  // Handle completion of typing exercise
  const handleComplete = (stats) => {
    setResults(stats);
    setShowResults(true);
  };
  
  // Reset and get a new text
  const handleNext = () => {
    setShowResults(false);
    setResults(null);
    if (practiceMode !== 'custom') {
      setCurrentTextIndex((prev) => (prev + 1) % practiceTexts[practiceMode].length);
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.h1 
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Practice Typing
        </motion.h1>
        
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Choose a practice mode and improve your typing speed and accuracy
        </motion.p>
        
        {/* Mode Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => { setPracticeMode('paragraph'); setShowResults(false); }}
            className={`px-4 py-2 rounded-md ${
              practiceMode === 'paragraph'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Paragraphs
          </button>
          <button
            onClick={() => { setPracticeMode('code'); setShowResults(false); }}
            className={`px-4 py-2 rounded-md ${
              practiceMode === 'code'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Code Snippets
          </button>
          <button
            onClick={() => { setPracticeMode('quotes'); setShowResults(false); }}
            className={`px-4 py-2 rounded-md ${
              practiceMode === 'quotes'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Quotes
          </button>
          <button
            onClick={() => { setPracticeMode('custom'); setShowResults(false); }}
            className={`px-4 py-2 rounded-md ${
              practiceMode === 'custom'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Custom Text
          </button>
        </div>
        
        {/* Custom Text Input */}
        {practiceMode === 'custom' && (
          <div className="mb-8">
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type or paste your custom practice text here..."
              className="w-full h-32 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        
        {!showResults ? (
          <>
            {/* Typing Box */}
            <TypingBox
              text={getCurrentText()}
              showStats={true}
              onComplete={handleComplete}
            />
            
            <div className="mt-8">
              <KeyboardSVG showHints={true} size="md" />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Your Results</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{results?.wpm || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">WPM</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <div 
                  className={`text-3xl font-bold ${
                    (results?.accuracy || 0) > 95 
                      ? 'text-green-600 dark:text-green-400' 
                      : (results?.accuracy || 0) > 80
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {results?.accuracy || 0}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {results?.time ? Math.round(results.time) : 0}s
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {results?.mistakes?.length || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Mistakes</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Try Another Text
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
