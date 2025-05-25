'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import useTypingStore from '@/lib/store';
import KeyboardSVG from '@/components/keyboard/KeyboardSVG';

// Simple component for rendering a lesson card
const LessonCard = ({ lesson, index }) => {
  const { id, title, description, progress, unlocked } = lesson;
  
  // Calculate a slight stagger effect
  const delay = index * 0.1;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-lg shadow-md overflow-hidden ${
        unlocked 
          ? 'bg-white dark:bg-gray-800 cursor-pointer' 
          : 'bg-gray-100 dark:bg-gray-900 opacity-70 cursor-not-allowed'
      }`}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {description}
        </p>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-4">
          <div 
            className="bg-blue-500 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {progress}% Complete
          </span>
          
          {unlocked ? (
            <Link 
              href={`/lessons/${id}`}
              className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-sm"
            >
              {progress > 0 ? 'Continue' : 'Start'}
            </Link>
          ) : (
            <span className="px-4 py-1 bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-sm">
              Locked
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Lessons() {
  const { lessons } = useTypingStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get the lessons for the current category
  const categoryLessons = selectedCategory === 'all' 
    ? Object.values(lessons) 
    : [lessons[selectedCategory]].filter(Boolean);
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Typing Lessons
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Follow our structured curriculum to master touch typing step-by-step
          </motion.p>
        </div>
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            All Levels
          </button>
          <button
            onClick={() => setSelectedCategory('beginner')}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === 'beginner'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedCategory('intermediate')}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === 'intermediate'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedCategory('advanced')}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === 'advanced'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Advanced
          </button>
        </motion.div>
        
        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryLessons.map((lesson, index) => (
            <LessonCard key={lesson.id} lesson={lesson} index={index} />
          ))}
        </div>
        
        {/* Keyboard Demo */}
        <motion.div 
          className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Master The Keyboard</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Our interactive keyboard shows you exactly which finger to use for each key
          </p>
          
          <div className="max-w-4xl mx-auto">
            <KeyboardSVG showHints={true} size="lg" />
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-500"></div>
              <span className="text-sm">Pinky Finger</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-sm">Ring Finger</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm">Middle Finger</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Index Finger</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Thumb</span>
            </div>
          </div>
        </motion.div>
        
        {/* Learning Tips */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Typing Tips for Beginners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-3">Correct Posture</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Sit up straight with your back against the chair</li>
                <li>• Keep your feet flat on the floor</li>
                <li>• Position your elbows at a 90-degree angle</li>
                <li>• Rest your wrists slightly above the keyboard</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-3">Finger Placement</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Place your left fingers on A, S, D, F</li>
                <li>• Place your right fingers on J, K, L, ;</li>
                <li>• Rest your thumbs on the space bar</li>
                <li>• Feel for the F and J key bumps without looking</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
