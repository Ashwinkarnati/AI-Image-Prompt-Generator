"use client"
import React, { useState } from 'react'
import Lookup from '../_data/Lookup'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Hero = () => {
    const [logoTitle, setLogoTitle] = useState('');
    
    // Sample prompt suggestions
    const promptSuggestions = [
        "majestic mountain landscape at sunset",
        "cyberpunk city street scene",
        "cute anime character with vibrant colors",
        "futuristic spaceship interior design",
        "watercolor painting of autumn forest"
    ];

    return (
        <div className='flex items-center mt-8 md:mt-16 flex-col gap-8 px-4'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-center space-y-6 max-w-4xl'
            >
                <h1 className='text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight'>
                    {Lookup.HeroHeading}
                </h1>
                <h2 className='text-3xl sm:text-4xl font-bold text-gray-800'>
                    {Lookup.HeroSubheading}
                </h2>
                <p className='text-lg text-gray-600 md:text-xl max-w-3xl mx-auto'>
                    {Lookup.HeroDesc}
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='flex flex-col sm:flex-row gap-4 w-full max-w-2xl mt-2'
            >
                <div className='relative w-full'>
                    <input
                        placeholder={Lookup.InputTitlePlaceholder}
                        value={logoTitle}
                        className='p-5 border-2 border-gray-200 rounded-xl w-full focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all shadow-sm text-lg pr-12'
                        onChange={(event) => setLogoTitle(event.target.value)}
                    />
                    {logoTitle && (
                        <button 
                            onClick={() => setLogoTitle('')}
                            className='absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-800 cursor-pointer'
                        >
                            ✕
                        </button>
                    )}
                </div>
                <Link 
                    href={'/create?title=' + encodeURIComponent(logoTitle)} 
                    className='w-full sm:w-auto'
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button 
                            className="mt-3 w-full sm:w-auto px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            disabled={!logoTitle}
                        >
                            <span className="drop-shadow-sm">Create Magic</span> ✨
                        </Button>
                    </motion.div>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='mt-6 w-full max-w-2xl'
            >
                <div className='text-sm text-gray-500 mb-2'>Try these prompt ideas:</div>
                <div className='flex flex-wrap gap-2 justify-center'>
                    {promptSuggestions.map((prompt, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setLogoTitle(prompt)}
                            className='px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-all text-gray-700'
                        >
                            {prompt}
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Hero