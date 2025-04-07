"use client"
import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import Colors from '@/app/_data/Colors'
import { motion } from 'framer-motion'

const LogoColorPallete = ({ onHandleInputChange, formData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="my-10 space-y-6"
    >
      <HeadingDescription 
        title={Lookup?.LogoColorPaletteTitle} 
        Description={Lookup?.LogoColorPaletteDesc} 
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-6">
        {Colors.map((palette, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 shadow-sm ${
              formData?.palette === palette.name 
                ? 'ring-4 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md border border-gray-100'
            }`}
            onClick={() => onHandleInputChange(palette.name)}
          >
            <div className="flex h-32 bg-white"> {/* Added white background */}
              {palette?.colors.map((color, colorIndex) => (
                <motion.div
                  key={colorIndex}
                  whileHover={{ flex: 1.3 }}
                  className="flex-1 h-full transition-all duration-300 relative group"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)' // subtle border
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-2 py-1 rounded-full"
                      style={{ // Dynamic text color
                        textShadow: '0 1px 1px rgba(0,0,0,0.1)'
                      }}>
                      {color}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={`absolute bottom-0 left-0 right-0 p-3 text-sm font-medium text-center ${
              formData?.palette === palette.name 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-900/80 text-white'
            }`}>
              {palette.name}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3"
      >
        <div className="text-blue-500 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div className="text-sm text-blue-700">
          <strong>Pro Tip:</strong> Hover over colors to see their HEX codes. 
          Selected palettes have a blue border.
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LogoColorPallete