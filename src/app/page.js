'use client';

import Image from "next/image";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import KeyboardSVG from "@/components/keyboard/KeyboardSVG";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Master Touch Typing with <span className="text-blue-600 dark:text-blue-400">TypingFlow</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                An interactive, offline-first typing tutor with real-time feedback, 
                animated keyboard guidance, and personalized lessons.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link 
                  href="/lessons/beginner"
                  className="btn btn-primary py-3 px-8 text-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg transition-colors"
                >
                  Start Learning
                </Link>
                
                <Link 
                  href="/practice"
                  className="btn btn-outline py-3 px-8 text-center rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-lg transition-colors"
                >
                  Practice Now
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
                <KeyboardSVG size="lg" targetKey="f" />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TypingFlow?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our interactive approach makes learning to type engaging, effective, and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-2xl mb-4">
                🎯
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning Path</h3>
              <p className="text-gray-600 dark:text-gray-400">
                From beginner to expert, follow our carefully designed curriculum to master touch typing step-by-step.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-2xl mb-4">
                🔑
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Keyboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get real-time visual feedback with our animated SVG keyboard highlighting correct finger placement.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-2xl mb-4">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Statistics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your WPM, accuracy, and progress with beautiful real-time visualizations.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center text-2xl mb-4">
                🎮
              </div>
              <h3 className="text-xl font-semibold mb-2">Typing Games</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Improve your skills through fun, engaging games designed to increase your speed and accuracy.
              </p>
            </motion.div>
            
            {/* Feature 5 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center text-2xl mb-4">
                🌙
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark Mode & Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enjoy custom themes, screen reader support, and adjustable font sizes for comfortable typing.
              </p>
            </motion.div>
            
            {/* Feature 6 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-2xl mb-4">
                💾
              </div>
              <h3 className="text-xl font-semibold mb-2">Offline-First PWA</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Install the app and use it without internet - all lessons and progress are saved locally.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Typing Like a Pro?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of users who have improved their typing speed and accuracy with TypingFlow.
            </p>
            <Link
              href="/lessons/beginner"
              className="inline-block py-3 px-8 bg-white text-blue-600 font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started For Free
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
