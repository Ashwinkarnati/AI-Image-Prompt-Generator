"use client"
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import axios from "axios";
import Prompt from "@/app/_data/Prompt";
import { Loader2Icon, SparklesIcon, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function LogoIdea({ formData, onHandleInputChange }) {
  const router = useRouter();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(formData?.idea || "");
  const [select, setSelected] = useState(formData?.idea || "");
  const [promptLoading, setPromptLoading] = useState(false);

  useEffect(() => {
    if (formData?.title && ideas.length === 0) {
      generateLogoDesignIdea();
    }
  }, [formData?.title]);

  const generateLogoDesignIdea = async () => {
    setLoading(true);
    setError(null);
    try {
      const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
        "{logoType}",
        formData?.design?.title || ""
      )
        .replace("{logoTitle}", formData?.title || "")
        .replace("{logoDesc}", formData?.desc || "")
        .replace("{logoPrompt}", formData?.design?.prompt || "");

      const result = await axios.post("/api/ai-ideas", {
        prompt: PROMPT,
      });

      if (result.data?.success) {
        const receivedIdeas = Array.isArray(result.data.ideas) 
          ? result.data.ideas 
          : result.data.ideas?.ideas || [];
        
        setIdeas(receivedIdeas.length > 0 ? receivedIdeas : getDefaultIdeas());
      } else {
        throw new Error(result.data?.error || "Failed to generate ideas");
      }
    } catch (error) {
      console.error("Error generating ideas:", error);
      setError("Couldn't generate ideas. Using default options instead.");
      setIdeas(getDefaultIdeas());
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePrompt = async () => {
    setPromptLoading(true);
    try {
      localStorage.setItem('formData', JSON.stringify(formData));
      router.push('/generate-prompt');
    } catch (error) {
      console.error("Prompt generation error:", error);
      setError("Failed to navigate. Please try again.");
    } finally {
      setPromptLoading(false);
    }
  };

  const getDefaultIdeas = () => [
    "Modern minimalist design with clean typography",
    "Vintage-inspired emblem with classic elements",
    "Abstract geometric composition",
    "Mascot or character illustration",
    "Let AI suggest the optimal creative direction"
  ];

  const handleOptionSelect = (item) => {
    setSelected(item);
    setSelectedOption(item);
    onHandleInputChange(item);
  };

  const handleRegenerate = () => {
    setIdeas([]);
    generateLogoDesignIdea();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="my-10 space-y-8"
    >
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />

      <div className="flex flex-col items-center gap-6">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 py-8"
          >
            <Loader2Icon className="animate-spin h-10 w-10 text-blue-500" />
            <p className="text-gray-600">Crafting creative ideas for you...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <div className="text-red-500 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </motion.div>
        )}

        {!loading && ideas.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="flex flex-wrap gap-3 justify-center w-full max-w-2xl"
            >
              {ideas.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleOptionSelect(item)}
                  className={`
                    px-5 py-2.5 rounded-full border text-sm transition-all duration-300 cursor-pointer
                    ${
                      select === item
                        ? "border-blue-600 bg-blue-600 text-white font-medium shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                    }
                  `}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-md"
            >
              <Button 
                variant="outline" 
                onClick={handleRegenerate}
                className="gap-2 px-6 py-3"
              >
                <SparklesIcon className="h-4 w-4" />
                Regenerate Ideas
              </Button>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button 
                  onClick={handleGeneratePrompt}
                  disabled={promptLoading || !select}
                  className="w-full gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                >
                  {promptLoading ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Generate Prompt
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default LogoIdea;