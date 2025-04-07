"use client"
import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import LogoDesig from '@/app/_data/ImgDesig'
import Image from 'next/image'
import { motion } from 'framer-motion'

const LogoDesigns = ({ onHandleInputChange, formData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="my-10 space-y-8"
    >
      <HeadingDescription 
        title={Lookup?.LogoDesignTitle} 
        Description={Lookup?.LogoDesignDesc} 
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {LogoDesig.map((design, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 shadow-sm ${
              formData?.design?.title === design.title
                ? 'ring-4 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md border border-gray-200/70'
            }`}
            onClick={() => onHandleInputChange(design)}
          >
            <div className="relative aspect-square bg-gray-100">
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className={`p-4 transition-colors ${
              formData?.design?.title === design.title 
                ? 'bg-blue-50' 
                : 'bg-white hover:bg-gray-50'
            }`}>
              <h2 className={`text-center font-medium ${
                formData?.design?.title === design.title
                  ? 'text-blue-600'
                  : 'text-gray-700 group-hover:text-gray-900'
              }`}>
                {design.title}
              </h2>
            </div>

            {formData?.design?.title === design.title && (
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Selected
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Click to select a style. Selected option will be highlighted.
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LogoDesigns