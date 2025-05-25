'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Initial lesson categories
const INITIAL_LESSONS = {
  beginner: {
    id: 'beginner',
    title: 'Beginner',
    description: 'Start with home row keys and basic finger placement',
    progress: 0,
    unlocked: true,
    exercises: [
      {
        id: 'home-row',
        title: 'Home Row Keys',
        description: 'Learn the home row keys (asdf jkl;)',
        text: 'asdf jkl; asdf jkl; fjfj dkdk slsl a;a; fj dk sl a; jf kd ls ;a',
        completed: false,
        unlocked: true,
        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
      },
      {
        id: 'home-row-words',
        title: 'Home Row Words',
        description: 'Simple words using only home row keys',
        text: 'dad sad fad lad ash flask salad falls jak lash dash fall ask',
        completed: false,
        unlocked: false,
        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'h'],
      },
      {
        id: 'top-row',
        title: 'Top Row Keys',
        description: 'Learn the top row keys (qwerty uiop)',
        text: 'qwerty uiop qwer tyui op qwer tyui op qw er ty ui op',
        completed: false,
        unlocked: false,
        targetKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      },
      {
        id: 'bottom-row',
        title: 'Bottom Row Keys',
        description: 'Learn the bottom row keys (zxcv bnm,)',
        text: 'zxcv bnm, zxcv bnm, zz xx cc vv bb nn mm ,, vbnm zxcv',
        completed: false,
        unlocked: false,
        targetKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ','],
      },
    ],
  },
  intermediate: {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Practice with common words, numbers, and punctuation',
    progress: 0,
    unlocked: false,
    exercises: [
      {
        id: 'numbers',
        title: 'Number Row',
        description: 'Practice typing numbers and symbols',
        text: '1 2 3 4 5 6 7 8 9 0 12345 67890 10 20 30 40 50 60 70 80 90 100',
        completed: false,
        unlocked: true,
        targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      },
      {
        id: 'punctuation',
        title: 'Punctuation',
        description: 'Practice with periods, commas, and other symbols',
        text: 'Hello, world! How are you? I\'m doing "great" today; thanks for asking. The end.',
        completed: false,
        unlocked: false,
        targetKeys: ['.', ',', '!', '?', "'", '"', ';'],
      },
      {
        id: 'capitalization',
        title: 'Capital Letters',
        description: 'Practice with capital letters and sentences',
        text: 'The Quick Brown Fox Jumps Over The Lazy Dog. Every Good Boy Deserves Fruit.',
        completed: false,
        unlocked: false,
        targetKeys: ['Shift', 'T', 'Q', 'B', 'F', 'J', 'O', 'L', 'D', 'E', 'G', 'D', 'F'],
      },
    ],
  },
  advanced: {
    id: 'advanced',
    title: 'Advanced',
    description: 'Master typing with complex texts, code samples, and speed challenges',
    progress: 0,
    unlocked: false,
    exercises: [
      {
        id: 'speed-drill',
        title: 'Speed Drill',
        description: 'Focus on typing speed with common words',
        text: 'the and that have with this from they some what were when there which would make like time just about know people into year your good some could them see other than then now only look come its over think also back after use two how our work first well way even new want because any these give day most us',
        completed: false,
        unlocked: true,
        targetKeys: [],
        timeLimit: 60, // 60 seconds time limit
      },
      {
        id: 'code-javascript',
        title: 'JavaScript Code',
        description: 'Practice typing JavaScript code',
        text: 'function calculateSum(array) {\n  return array.reduce((sum, current) => {\n    return sum + current;\n  }, 0);\n}\n\nconst numbers = [1, 2, 3, 4, 5];\nconst sum = calculateSum(numbers);\nconsole.log(`The sum is ${sum}`);',
        completed: false,
        unlocked: false,
        targetKeys: [],
      },
      {
        id: 'prose',
        title: 'Literary Prose',
        description: 'Type a paragraph of literary prose',
        text: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
        completed: false,
        unlocked: false,
        targetKeys: [],
      },
    ],
  },
};

// Custom lessons storage for user-created lessons
const INITIAL_CUSTOM_LESSONS = [];

const useTypingStore = create(
  persist(
    (set, get) => ({
      // User Statistics
      stats: {
        history: [],
        dailyStats: {
          date: new Date().toISOString().split('T')[0],
          wpm: [],
          accuracy: [],
          timeSpent: 0,
        },
        achievements: [],
        averageWpm: 0,
        topWpm: 0,
        averageAccuracy: 0,
        practiceStreak: 0,
        lastPracticeDate: null,
        totalPracticeTime: 0,
        lessonsCompleted: 0,
      },

      // Stats Actions
      updateTypingStats: (wpm, accuracy, duration) => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const stats = { ...state.stats };
          
          // Update history
          stats.history.push({
            date: new Date().toISOString(),
            wpm,
            accuracy,
            duration
          });

          // Update daily stats
          if (stats.dailyStats.date !== today) {
            stats.dailyStats = {
              date: today,
              wpm: [wpm],
              accuracy: [accuracy],
              timeSpent: duration
            };
          } else {
            stats.dailyStats.wpm.push(wpm);
            stats.dailyStats.accuracy.push(accuracy);
            stats.dailyStats.timeSpent += duration;
          }

          // Update averages
          stats.averageWpm = stats.history.reduce((sum, entry) => sum + entry.wpm, 0) / stats.history.length;
          stats.averageAccuracy = stats.history.reduce((sum, entry) => sum + entry.accuracy, 0) / stats.history.length;
          stats.topWpm = Math.max(stats.topWpm, wpm);
          stats.totalPracticeTime += duration;

          // Update practice streak
          const lastDate = stats.lastPracticeDate ? new Date(stats.lastPracticeDate) : null;
          const currentDate = new Date();
          if (!lastDate) {
            stats.practiceStreak = 1;
          } else {
            const daysDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
            if (daysDiff === 1) {
              stats.practiceStreak += 1;
            } else if (daysDiff > 1) {
              stats.practiceStreak = 1;
            }
          }
          stats.lastPracticeDate = currentDate.toISOString();

          return { stats };
        });
      },

      completeLesson: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            lessonsCompleted: state.stats.lessonsCompleted + 1
          }
        }));
      },

      // Achievements System
      unlockAchievement: (achievement) => {
        set((state) => ({
          stats: {
            ...state.stats,
            achievements: [...state.stats.achievements, achievement]
          }
        }));
      },

      // Lessons configuration
      lessons: INITIAL_LESSONS,
      customLessons: INITIAL_CUSTOM_LESSONS,
      
      // UI preferences
      preferences: {
        darkMode: false, // Will be auto-detected based on system
        keyboardSize: 'lg',
        soundEnabled: true,
        showKeyHints: true,
        showFingerHints: true,
        fontSize: 'medium', // small, medium, large
      },
      
      // Current lesson/exercise state
      currentLesson: null,
      currentExercise: null,
      
      // Store actions
      setPreference: (key, value) => 
        set(state => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        })),
        
      // Records exercise completion and updates stats
      completeExercise: (exerciseId, lessonId, stats) => {
        set(state => {
          const lessons = { ...state.lessons };
          const lesson = lessons[lessonId];
          
          if (!lesson) return { lessons };
          
          // Find and mark exercise as completed
          const exerciseIndex = lesson.exercises.findIndex(ex => ex.id === exerciseId);
          if (exerciseIndex === -1) return { lessons };
          
          lesson.exercises[exerciseIndex].completed = true;
          
          // Unlock the next exercise if available
          if (exerciseIndex < lesson.exercises.length - 1) {
            lesson.exercises[exerciseIndex + 1].unlocked = true;
          }
          
          // Calculate lesson progress
          const completed = lesson.exercises.filter(ex => ex.completed).length;
          lesson.progress = Math.round((completed / lesson.exercises.length) * 100);
          
          // If lesson is completed, unlock next lesson
          if (lesson.progress === 100) {
            const lessonIds = Object.keys(lessons);
            const currentLessonIndex = lessonIds.indexOf(lessonId);
            
            if (currentLessonIndex !== -1 && currentLessonIndex < lessonIds.length - 1) {
              lessons[lessonIds[currentLessonIndex + 1]].unlocked = true;
            }
          }
          
          // Update user stats
          const now = new Date().getTime();
          const { wpm, accuracy } = stats;
          const newStats = { ...state.stats };
          
          // Update WPM stats
          newStats.wpm.history.push({ timestamp: now, wpm });
          newStats.wpm.highest = Math.max(newStats.wpm.highest, wpm);
          newStats.wpm.average = newStats.wpm.history.reduce((sum, entry) => sum + entry.wpm, 0) / 
            newStats.wpm.history.length;
            
          // Update accuracy stats
          newStats.accuracy.history.push({ timestamp: now, accuracy });
          newStats.accuracy.highest = Math.max(newStats.accuracy.highest, accuracy);
          newStats.accuracy.average = newStats.accuracy.history.reduce((sum, entry) => sum + entry.accuracy, 0) / 
            newStats.accuracy.history.length;
            
          // Update mistakes
          if (stats.mistakes) {
            stats.mistakes.forEach(mistake => {
              const key = mistake.expected;
              newStats.mistakes.byKey[key] = (newStats.mistakes.byKey[key] || 0) + 1;
              newStats.mistakes.total += 1;
            });
          }
          
          // Update completed exercises count
          newStats.completedExercises += 1;
          
          // Update practice time
          newStats.practiceTime += Math.round(stats.time);
          
          // Update streak
          const today = new Date().toDateString();
          const lastPractice = newStats.streak.lastPractice 
            ? new Date(newStats.streak.lastPractice).toDateString() 
            : null;
            
          if (lastPractice !== today) {
            // It's a new day
            if (lastPractice) {
              const yesterday = new Date(now - 86400000).toDateString(); // 24h ago
              if (lastPractice === yesterday) {
                // Consecutive day - streak continues
                newStats.streak.current += 1;
                newStats.streak.longest = Math.max(newStats.streak.longest, newStats.streak.current);
              } else {
                // Streak broken
                newStats.streak.current = 1;
              }
            } else {
              // First day of practice
              newStats.streak.current = 1;
              newStats.streak.longest = 1;
            }
            
            newStats.streak.lastPractice = now;
          }
          
          return { 
            lessons,
            stats: newStats
          };
        });
      },
      
      // Creates a custom lesson
      createCustomLesson: (lesson) => {
        set(state => ({
          customLessons: [...state.customLessons, {
            ...lesson,
            id: `custom-${Date.now()}`,
            timestamp: Date.now()
          }]
        }));
      },
      
      // Sets the current lesson and exercise
      startExercise: (lessonId, exerciseId) => {
        set({
          currentLesson: lessonId,
          currentExercise: exerciseId
        });
      },
      
      // Resets progress (for testing purposes)
      resetProgress: () => {
        set({
          lessons: INITIAL_LESSONS,
          customLessons: INITIAL_CUSTOM_LESSONS,
          stats: {
            wpm: { average: 0, highest: 0, history: [] },
            accuracy: { average: 0, highest: 0, history: [] },
            mistakes: { byKey: {}, total: 0 },
            practiceTime: 0,
            completedExercises: 0,
            streak: { current: 0, longest: 0, lastPractice: null },
          }
        });
      },

      // Statistics state
      statistics: {
        totalPracticeTime: 0, // in minutes
        totalCharactersTyped: 0,
        totalWordsTyped: 0,
        averageWPM: 0,
        averageAccuracy: 0,
        dailyStats: {}, // format: { '2025-05-25': { wpm: 60, accuracy: 98, timeSpent: 30 } }
        bestWPM: 0,
        bestAccuracy: 0,
        practiceStreak: 0,
        lastPracticeDate: null,
      },

      // Statistics actions
      updateStatistics: (sessionStats) => {
        const {
          wpm,
          accuracy,
          timeSpent,
          charactersTyped,
          wordsTyped,
        } = sessionStats;

        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const dailyStats = state.statistics.dailyStats;
          const currentDayStats = dailyStats[today] || { wpm: 0, accuracy: 0, timeSpent: 0 };

          // Update streak
          let streak = state.statistics.practiceStreak;
          const lastDate = state.statistics.lastPracticeDate;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (lastDate === yesterdayStr) {
            streak += 1;
          } else if (lastDate !== today) {
            streak = 1;
          }

          // Calculate new averages
          const totalSessions = Object.keys(dailyStats).length + 1;
          const newAverageWPM = (state.statistics.averageWPM * (totalSessions - 1) + wpm) / totalSessions;
          const newAverageAccuracy = (state.statistics.averageAccuracy * (totalSessions - 1) + accuracy) / totalSessions;

          return {
            statistics: {
              ...state.statistics,
              totalPracticeTime: state.statistics.totalPracticeTime + timeSpent,
              totalCharactersTyped: state.statistics.totalCharactersTyped + charactersTyped,
              totalWordsTyped: state.statistics.totalWordsTyped + wordsTyped,
              averageWPM: newAverageWPM,
              averageAccuracy: newAverageAccuracy,
              bestWPM: Math.max(state.statistics.bestWPM, wpm),
              bestAccuracy: Math.max(state.statistics.bestAccuracy, accuracy),
              practiceStreak: streak,
              lastPracticeDate: today,
              dailyStats: {
                ...dailyStats,
                [today]: {
                  wpm: Math.max(currentDayStats.wpm, wpm),
                  accuracy: Math.max(currentDayStats.accuracy, accuracy),
                  timeSpent: currentDayStats.timeSpent + timeSpent,
                },
              },
            },
          };
        });
      },

      // Get statistics for the last n days
      getRecentStats: (days = 7) => {
        const stats = get().statistics.dailyStats;
        const today = new Date();
        const result = [];

        for (let i = days - 1; i >= 0; i--) {
          const date = new Date();
          date.setDate(today.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          result.push({
            date: dateStr,
            ...(stats[dateStr] || { wpm: 0, accuracy: 0, timeSpent: 0 }),
          });
        }

        return result;
      },
    }),
    {
      name: 'typingflow-storage', // Storage key in localStorage
    }
  )
);

export default useTypingStore;
