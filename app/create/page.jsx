"use client"
import React, { useState, useEffect } from 'react'
import LogoTitle from './_components/ImageTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LogoDesc from './_components/ImageDesc'
import LogoColorPallete from './_components/ColorPallete'
import LogoDesigns from './_components/ImageDesigns'
import LogoIdea from './_components/ImageIdea'
import { useSearchParams } from 'next/navigation'

const CreateLogo = () => {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    palette: '',
    design: null,
    idea: ''
  })

  // Initialize title from search params when component mounts
  useEffect(() => {
    const titleFromParams = searchParams.get('title')
    if (titleFromParams) {
      setFormData(prev => ({
        ...prev,
        title: titleFromParams
      }))
    }
  }, [searchParams])

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    console.log(formData)
  }

  return (
    <div className='mt-5 p-10 border rounded-xl 2xl:mx-72'>
      {step === 1 && (
        <LogoTitle 
          onHandleInputChange={(v) => onHandleInputChange('title', v)} 
          formData={formData}
        />
      )}
      {step === 2 && (
        <LogoDesc 
          onHandleInputChange={(v) => onHandleInputChange('desc', v)} 
          formData={formData}
        />
      )}
      {step === 3 && (
        <LogoColorPallete 
          onHandleInputChange={(v) => onHandleInputChange('palette', v)} 
          formData={formData}
        />
      )}
      {step === 4 && (
        <LogoDesigns 
          onHandleInputChange={(v) => onHandleInputChange('design', v)} 
          formData={formData}
        />
      )}
      {step === 5 && (
        <LogoIdea 
          onHandleInputChange={(v) => onHandleInputChange('idea', v)} 
          formData={formData}
        />
      )}
      
      <div className='flex justify-between items-center'>
        {step !== 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft/> Previous
          </Button>
        )}
       { step<5 && <Button onClick={() => setStep(step + 1)}>
          <ArrowRight/> Continue
        </Button>}
      </div>
    </div>
  )
}

export default CreateLogo