'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import KeyboardSVG from '@/components/keyboard/KeyboardSVG';
import TypingBox from '@/components/practice/TypingBox';
import useTypingStore from '@/lib/store';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { lessons, startExercise, completeExercise } = useTypingStore();
  
  const [lessonCategory, setLessonCategory] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [currentStep, setCurrentStep] = useState('intro'); // intro, demo, practice, complete
  const [targetKeys, setTargetKeys] = useState([]);
  const [demoIndex, setDemoIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Get the lesson category and exercise based on route parameters
  useEffect(() => {
    const categoryId = params.categoryId;
    
    // If we have a direct category match, use that
    if (lessons[categoryId]) {
      setLessonCategory(lessons[categoryId]);
      
      // If we also have an exercise parameter, load that exercise
      if (params.exerciseId && lessons[categoryId].exercises) {
        const exercise = lessons[categoryId].exercises.find(
          ex => ex.id === params.exerciseId
        );
        
        if (exercise && exercise.unlocked) {
          setSelectedExercise(exercise);
          setTargetKeys(exercise.targetKeys || []);
          startExercise(categoryId, exercise.id);
        } else {
          // Exercise not found or locked, redirect to lessons page
          router.push('/lessons');
        }
      } else {
        // Load the first unlocked exercise if no specific one is selected
        const firstUnlockedExercise = lessons[categoryId].exercises.find(
          ex => ex.unlocked
        );
        
        if (firstUnlockedExercise) {
          setSelectedExercise(firstUnlockedExercise);
          setTargetKeys(firstUnlockedExercise.targetKeys || []);
          startExercise(categoryId, firstUnlockedExercise.id);
        } else {
          // No unlocked exercises, redirect to lessons page
          router.push('/lessons');
        }
      }
    } else {
      // Category not found, redirect to lessons page
      router.push('/lessons');
    }
  }, [lessons, params, router, startExercise]);
  
  // Demo animation for the keyboard
  useEffect(() => {
    if (currentStep === 'demo' && targetKeys.length > 0) {
      const animateKeys = async () => {
        for (let i = 0; i < targetKeys.length; i++) {
          setIsAnimating(true);
          setActiveKey(targetKeys[i]);
          setDemoIndex(i);
          // Wait before showing the next key
          await new Promise(resolve => setTimeout(resolve, 1200));
        }
        setIsAnimating(false);
      };
      
      animateKeys();
    }
  }, [currentStep, targetKeys]);
  
  // Handle exercise completion
  const handleExerciseComplete = (stats) => {
    if (lessonCategory && selectedExercise) {
      completeExercise(selectedExercise.id, lessonCategory.id, stats);
      setCurrentStep('complete');
    }
  };
  
  if (!lessonCategory || !selectedExercise) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl">Loading lesson...</p>
        </div>
      </AppLayout>
    );
  }
  
  // Render the appropriate step based on currentStep
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/lessons" className="text-blue-500 hover:underline mb-2 inline-block">
              &larr; All Lessons
            </Link>
            <h1 className="text-3xl font-bold">{selectedExercise.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{selectedExercise.description}</p>
          </div>
          
          {/* Step indicator */}
          <div className="hidden md:flex items-center gap-2">
            {['intro', 'demo', 'practice', 'complete'].map((step, index) => (
              <div 
                key={step} 
                className={`w-3 h-3 rounded-full ${
                  currentStep === step 
                    ? 'bg-blue-500' 
                    : index <= ['intro', 'demo', 'practice', 'complete'].indexOf(currentStep) 
                    ? 'bg-blue-300' 
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {/* Introduction Step */}
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">
                    In this exercise, you'll learn to type the following keys:
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {targetKeys.map((key) => (
                      <span 
                        key={key} 
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md px-3 py-1 text-lg font-mono"
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                  
                  <p className="mb-6 text-gray-700 dark:text-gray-300">
                    First, we'll show you the correct finger positions on our interactive keyboard,
                    then you'll practice typing the keys yourself.
                  </p>
                  
                  <button
                    onClick={() => setCurrentStep('demo')}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Start Demo
                  </button>
                </div>
                
                <div className="md:w-1/2">
                  <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
                    <Image
                      src="/hands-typing.png" 
                      alt="Hand position for typing"
                      width={400}
                      height={300}
                      className="rounded-lg"
                      // Fallback if image doesn't exist
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Demo Step */}
          {currentStep === 'demo' && (
            <motion.div
              key="demo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Watch the Demo</h2>
              
              <p className="text-center mb-8 text-gray-700 dark:text-gray-300">
                {isAnimating 
                  ? `Now focus on how to type "${activeKey}" with the correct finger`
                  : "Let's see how to position your fingers on the keyboard"}
              </p>
              
              <div className="mb-8">
                <KeyboardSVG 
                  activeKey={activeKey} 
                  showHints={true}
                  animated={true}
                  size="lg"
                />
              </div>
              
              {/* Progress indicator */}
              {targetKeys.length > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-6">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${isAnimating ? ((demoIndex + 1) / targetKeys.length) * 100 : 0}%` 
                    }}
                  />
                </div>
              )}
              
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep('intro')}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Back
                </button>
                
                <button
                  onClick={() => setCurrentStep('practice')}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  disabled={isAnimating}
                >
                  {isAnimating ? 'Please Wait...' : 'Start Practice'}
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Practice Step */}
          {currentStep === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Practice Time</h2>
              
              <p className="text-center mb-8 text-gray-700 dark:text-gray-300">
                Type the following text. Remember to use the correct fingers for each key.
              </p>
              
              <div className="mb-8">
                <TypingBox 
                  text={selectedExercise.text} 
                  showStats={true} 
                  onComplete={handleExerciseComplete}
                />
              </div>
              
              <div className="mt-8">
                <KeyboardSVG 
                  showHints={true}
                  size="md"
                />
              </div>
            </motion.div>
          )}
          
          {/* Complete Step */}
          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
            >
              <div className="mb-6 text-6xl">🎉</div>
              
              <h2 className="text-2xl font-semibold mb-4">Lesson Complete!</h2>
              
              <p className="mb-8 text-gray-700 dark:text-gray-300">
                Great job! You've completed this exercise. Keep practicing to improve your speed and accuracy.
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentStep('practice')}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Practice Again
                </button>
                
                <Link 
                  href="/lessons"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Next Lesson
                </Link>
              </div>
              
              {/* Lesson Status */}
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="font-semibold mb-2">Lesson Progress</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                  <div 
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${lessonCategory.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {lessonCategory.progress}% of {lessonCategory.title} level completed
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
