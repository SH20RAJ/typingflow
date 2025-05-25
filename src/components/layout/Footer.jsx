'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⌨️</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">TypingFlow</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A modern, interactive typing master app
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Learn</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/lessons/beginner" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Beginner Lessons
                  </Link>
                </li>
                <li>
                  <Link href="/lessons/intermediate" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Intermediate
                  </Link>
                </li>
                <li>
                  <Link href="/lessons/advanced" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Advanced
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Practice</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/practice/text" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Text Typing
                  </Link>
                </li>
                <li>
                  <Link href="/practice/code" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Code Typing
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Typing Games
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Keyboard Guide
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Typing Tips
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} TypingFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
