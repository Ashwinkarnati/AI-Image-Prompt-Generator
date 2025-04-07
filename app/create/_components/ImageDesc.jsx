"use client"
import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { motion } from 'framer-motion'

const LogoDesc = ({ onHandleInputChange, formData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="my-8 space-y-5"
    >
      <HeadingDescription 
        title={Lookup?.LogoDescTitle} 
        Description={Lookup?.LogoDescDesc} 
      />

      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="relative"
        >
          <textarea
            placeholder="Describe your vision in detail..."
            value={formData?.desc || ''}
            className="p-5 border-2 border-gray-200 rounded-xl w-full h-48 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm text-lg resize-none pr-20"
            onChange={(event) => onHandleInputChange(event.target.value)}
            maxLength={500}
          />
          {formData?.desc && (
            <button 
              onClick={() => onHandleInputChange('')}
              className="absolute right-20 top-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <div className={`absolute right-4 top-3 text-sm ${
            formData?.desc?.length > 400 ? 'text-red-500' : 'text-gray-400'
          }`}>
            {formData?.desc?.length || 0}/500
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4 bg-blue-50 rounded-lg border border-blue-100"
      >
        <div className="flex items-start gap-3">
          <div className="text-blue-500 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className="text-sm text-blue-700">
            <strong>Pro Tip:</strong> Include these elements for best results:
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li><span className="font-medium">Subject:</span> Main focus of your image</li>
              <li><span className="font-medium">Style:</span> Art style (digital painting, watercolor, etc.)</li>
              <li><span className="font-medium">Lighting:</span> Time of day or light quality</li>
              <li><span className="font-medium">Details:</span> Specific features or textures</li>
              <li><span className="font-medium">Inspiration:</span> Artist names or references</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-sm text-gray-700">
          <span className="font-medium">Example:</span> "A majestic dragon soaring over snow-capped mountains at golden hour, 
          digital painting style with dramatic lighting, highly detailed scales reflecting the sunset, 
          fantasy art inspired by Greg Rutkowski and Artgerm, cinematic composition with atmospheric perspective"
        </div>
      </div>
    </motion.div>
  )
}

export default LogoDesc