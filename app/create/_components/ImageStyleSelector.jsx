"use client";
import React from 'react';
import HeadingDescription from './HeadingDescription';
import Lookup from '@/app/_data/Lookup';
import ImageStyles from '@/app/_data/promptTemplates'; // Optional: rename LogoDesig.js file to ImageStyles.js
import Image from 'next/image';

const ImageStyleSelector = ({ onHandleInputChange, formData }) => {
  return (
    <div className='my-10'>
      <HeadingDescription 
        title={Lookup?.LogoDesignTitle} 
        description={Lookup?.LogoDesignDesc} 
      />

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-4'>
        {ImageStyles.map((style, index) => {
          const isSelected = formData?.design?.title === style.title;
          return (
            <div 
              key={index}
              className={`p-1 rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected ? 'border-2 border-primary shadow-lg' : 'hover:border-2 border-gray-300'
              }`}
              onClick={() => onHandleInputChange(style)}
            >
              <Image 
                src={style.image} 
                alt={style.title} 
                width={300} 
                height={200} 
                className='w-full h-[170px] object-cover rounded-xl'
              />
              <h2 className='text-center mt-2 font-semibold'>{style.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageStyleSelector;
