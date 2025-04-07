"use client"
import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { motion } from 'framer-motion'

const LogoTitle = ({ onHandleInputChange, formData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='my-8 space-y-5'
    >
      <HeadingDescription 
        title={Lookup?.LogoTitle} 
        Description={Lookup?.LogoTitleDesc} 
      />

      <div className='relative'>
        <motion.div
          whileHover={{ scale: 1.005 }}
          className='relative'
        >
          <input 
            type='text'
            placeholder={Lookup?.InputTitlePlaceholder}
            className='p-5 border-2 border-gray-200 rounded-xl w-full focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm text-lg pr-20'
            value={formData.title}
            onChange={(event) => onHandleInputChange(event.target.value)}
            autoFocus
            maxLength={100}
          />
          {formData.title && (
            <button 
              onClick={() => onHandleInputChange('')}
              className='absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-sm ${
            formData.title?.length > 80 ? 'text-red-500' : 'text-gray-400'
          }`}>
            {formData.title?.length || 0}/100
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100'
      >
        <div className='text-blue-600 mt-0.5'>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div className='text-sm text-blue-700'>
          <strong>Pro Tip:</strong> Be specific with details like style, lighting, and composition. 
          <br />Example: "<span className='font-medium'>mystical forest at sunset with golden hour lighting, fantasy art style, highly detailed</span>"
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LogoTitle