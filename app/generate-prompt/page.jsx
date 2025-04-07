"use client";
import React, { useContext, useEffect, useState } from 'react';
import { UserDetailContext } from '../_context/UserDetailContext';
import Prompt from '../_data/Prompt';
import axios from 'axios';
import { Loader2, Wand2, Copy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const GenerateLogo = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const { userDetails } = useContext(UserDetailContext);

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    palette: '',
    idea: '',
    design: { title: '', prompt: '' }
  });

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [promptResult, setPromptResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    if (typeof window !== 'undefined' && user?.primaryEmailAddress?.emailAddress) {
      const storage = localStorage.getItem('formData');
      if (storage) {
        try {
          const parsedData = JSON.parse(storage);
          const mergedDesign = {
            ...formData.design,
            ...(parsedData.design || {})
          };
          const finalData = { ...parsedData, design: mergedDesign };
          setFormData(finalData);
          generateAILogo(finalData);
        } catch (err) {
          setError("Invalid form data. Please start again.");
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("No saved data found. Please complete the form first.");
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const generateAILogo = async (data) => {
    if (!isSignedIn) return;
    
    setGenerating(true);
    setError(null);
    try {
      const PROMPT = Prompt.LOGO_PROMPT
        .replace('{logoTitle}', data?.title || '')
        .replace('{logoDesc}', data?.desc || '')
        .replace('{logoColor}', data?.palette || '')
        .replace('{logoIdea}', data?.idea || '')
        .replace('{logoDesign}', data?.design?.title || '')
        .replace('{logoPrompt}', data?.design?.prompt || '');

      const result = await axios.post('/api/ai-img-model', {
        prompt: PROMPT,
        userId: user.id
      });

      if (!result.data) {
        throw new Error('No data received from API');
      }

      setPromptResult(result.data);
    } catch (err) {
      console.error('Error generating logo:', err);
      setError(err.message || 'Failed to generate prompt. Please try again later.');
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!promptResult) return;
    navigator.clipboard.writeText(JSON.stringify(promptResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    generateAILogo(formData);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ">
            Your AI-Generated Prompt
          </h1>
          {formData.title && (
            <p className="text-xl text-gray-600">
              Based on: <span className="font-medium">"{formData.title}"</span>
            </p>
          )}
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="h-14 w-14 text-blue-500 animate-spin mb-5" />
            <p className="text-gray-600 text-lg">Loading your creative prompt...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-red-800 mb-2">Oops, something went wrong</h3>
                <p className="text-red-700">{error}</p>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/')}
                    className="border-red-300 text-red-700 hover:bg-red-100 gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Return to Form
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : promptResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Your Custom Prompt</h2>
                  <p className="text-gray-600 mt-1">Ready to use with your favorite AI tool</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopy}
                    className="gap-2 shadow-sm"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRegenerate}
                    disabled={generating}
                    className="gap-2 shadow-sm"
                  >
                    {generating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="h-4 w-4" />
                    )}
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <pre className="whitespace-pre-wrap font-mono text-gray-800 text-sm sm:text-base">
                  {JSON.stringify(promptResult, null, 2)}
                </pre>
              </div>
              <div className="mt-8 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/')}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Editor
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="bg-blue-50 p-5 rounded-full inline-flex mb-5">
                <Wand2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">No prompt generated yet</h3>
              <p className="text-gray-600 mb-6">Click below to create your custom AI prompt</p>
              <Button 
                onClick={handleRegenerate} 
                disabled={generating}
                className="gap-2 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {generating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="h-5 w-5" />
                )}
                Generate Prompt
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GenerateLogo;