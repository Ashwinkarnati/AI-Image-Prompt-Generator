"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser, SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Header = () => {
  const { user } = useUser();
  
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className='px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-3 flex justify-between items-center border-b border-gray-200/50 bg-white/90 backdrop-blur-lg shadow-sm'
    >
      <Link href={'/'}>
      <div className='flex items-center gap-3'>
        <motion.div
          whileHover={{ rotate: 5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image 
            src={'/logo.png'} 
            alt='AI Prompt Craft' 
            width={50} 
            height={50}
            className='transition-all duration-300'
          />
        </motion.div>
        <div className='hidden md:block'>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'
          >
            PromptGenius
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-xs text-gray-500 font-medium'
          >
            Craft Perfect AI Prompts
          </motion.div>
        </div>
      </div>
      </Link>
      
      <div className='flex gap-3 items-center'>
        {!user && (
          <SignInButton mode='modal'>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                variant='default'
                className='rounded-full px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg hover:shadow-purple-300/50 transition-all hover:from-purple-700 hover:to-blue-600'
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Sign In
              </Button>
            </motion.div>
          </SignInButton>
        )}
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserButton 
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 border border-purple-100 shadow-sm",
                userButtonPopoverCard: "shadow-lg rounded-xl"
              }
            }}
          />
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header