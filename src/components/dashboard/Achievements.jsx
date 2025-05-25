'use client';

export function Achievements({ achievements }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-center">
            <div className={`p-2 rounded-lg ${achievement.completed ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
              {achievement.icon}
            </div>
            <div className="ml-4">
              <p className="font-medium">{achievement.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
            </div>
            {achievement.completed && (
              <div className="ml-auto">
                <span className="text-green-500">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
