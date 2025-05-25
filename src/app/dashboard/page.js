'use client';

import { useEffect, useState } from 'react';
import { StatisticsChart } from '@/components/dashboard/StatisticsChart';
import { StatsSummary } from '@/components/dashboard/StatsSummary';
import { Achievements } from '@/components/dashboard/Achievements';
import useStore from '@/lib/store';

// Default achievements data
const defaultAchievements = {
  averageWpm: 65,
  speedChange: 5,
  accuracy: 98,
  accuracyChange: -1,
  lessonsCompleted: 24,
  lessonsChange: 3,
  practiceHours: 12,
  practiceChange: 8
};

const mockChartData = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  wpm: 50 + Math.random() * 30
}));

const mockAchievements = [
  {
    id: 1,
    title: 'Speed Demon',
    description: 'Achieve 80 WPM in a practice session',
    completed: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Perfect Accuracy',
    description: 'Complete a lesson with 100% accuracy',
    completed: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Dedication',
    description: 'Practice for 7 days in a row',
    completed: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  }
];

export default function DashboardPage() {
  const statistics = useStore((state) => state.statistics);
  const getRecentStats = useStore((state) => state.getRecentStats);
  const [achievements, setAchievements] = useState(mockAchievements);

  const recentStats = getRecentStats(7);
  const chartData = recentStats.map(stat => ({
    date: new Date(stat.date).toLocaleDateString(),
    wpm: stat.wpm,
    accuracy: stat.accuracy
  }));

  const stats = {
    averageWpm: Math.round(statistics.averageWPM),
    speedChange: 0, // TODO: Calculate change from previous period
    accuracy: Math.round(statistics.averageAccuracy),
    accuracyChange: 0, // TODO: Calculate change from previous period
    lessonsCompleted: statistics.totalWordsTyped > 0 ? Math.floor(statistics.totalWordsTyped / 100) : 0,
    lessonsChange: 0,
    practiceHours: Math.round(statistics.totalPracticeTime / 60),
    practiceChange: 0
  };

  // Check for achievements
  useEffect(() => {
    const updatedAchievements = [
      {
        ...mockAchievements[0],
        completed: statistics.bestWPM >= 80
      },
      {
        ...mockAchievements[1],
        completed: statistics.bestAccuracy === 100
      },
      {
        ...mockAchievements[2],
        completed: statistics.practiceStreak >= 7
      }
    ];
    setAchievements(updatedAchievements);
  }, [statistics]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="space-y-8">
        <StatsSummary stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StatisticsChart data={chartData} />
          </div>
          <div className="lg:col-span-1">
            <Achievements achievements={achievements} />
          </div>
        </div>
      </div>
    </div>
  );
}
