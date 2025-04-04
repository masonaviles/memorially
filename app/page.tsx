'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db, storage } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Button } from '@/components/ui/button'
import { LandingStep } from '@/components/memorial/LandingStep'
import { StepOwnerName } from '@/components/memorial/StepOwnerName'
import { StepDeceasedName } from '@/components/memorial/StepDeceasedName'
import { StepPhoto } from '@/components/memorial/StepPhoto'
import { StepTribute } from '@/components/memorial/StepTribute'
import { StepService } from '@/components/memorial/StepService'
import { StepLocation } from '@/components/memorial/StepLocation'
import { StepRSVP } from '@/components/memorial/StepRSVP'
import { StepReferral } from '@/components/memorial/StepReferral'
import { ProgressBar } from '@/components/ui/ProgressBar'


export default function StartMemorial() {
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    ownerName: '',
    deceasedName: '',
    photo: null as File | null,
    tribute: '',
    stream: '',
    serviceDate: '',
    location: '',
    allowRSVP: 'rsvp_wall',
    referralSource: '',
    referralOther: ''
  })
  const [uploading, setUploading] = useState(false)

  const handleNext = () => setStep(prev => prev + 1)
  const handleChange = <K extends keyof typeof form>(field: K, value: typeof form[K]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    setUploading(true)
    let photoURL = ''

    if (form.photo) {
      const storageRef = ref(storage, `memorial-photos/${Date.now()}-${form.photo.name}`)
      await uploadBytes(storageRef, form.photo)
      photoURL = await getDownloadURL(storageRef)
    }

    const docRef = await addDoc(collection(db, 'memorials'), {
      ...form,
      photoURL,
      createdAt: serverTimestamp()
    })

    router.push(`/memorial/${docRef.id}`)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-4">
      {step === 0 && <LandingStep onNext={handleNext} />}

      {step > 0 && (
        <>

          <div className="relative mb-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="absolute left-0 top-0 -translate-y-0 text-2xl text-muted-foreground hover:text-foreground"
                aria-label="Go back"
              >
                ←
              </button>
            )}
            <ProgressBar step={step} total={8} />
          </div>
          <div className="text-left py-10">
            <h1
              className={`text-2xl font-semibold mb-6 transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
            >
              Start a Memorial
            </h1>
            {step === 1 && (
              <StepOwnerName
                value={form.ownerName}
                onChange={val => handleChange('ownerName', val)}
              />
            )}

            {step === 2 && (
              <StepDeceasedName
                value={form.deceasedName}
                onChange={val => handleChange('deceasedName', val)}
              />
            )}

            {step === 3 && <StepPhoto onChange={file => handleChange('photo', file)} />}

            {step === 4 && (
              <StepTribute
                value={form.tribute}
                onChange={val => handleChange('tribute', val)}
              />
            )}

            {step === 5 && (
              <>
                <StepService
                  value={form.serviceDate}
                  onChange={val => handleChange('serviceDate', val)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="text-sm text-muted-foreground underline hover:text-foreground"
                  >
                    Not yet
                  </button>
                </div>
              </>
            )}

            {step === 6 && (
              <StepLocation
                location={form.location}
                stream={form.stream}
                onLocationChange={val => handleChange('location', val)}
                onStreamChange={val => handleChange('stream', val)}
              />

            )}

            {step === 7 && (
              <StepRSVP
                value={form.allowRSVP}
                onChange={val => handleChange('allowRSVP', val)}
              />
            )}

            {step === 8 && (
              <StepReferral
                referralSource={form.referralSource}
                referralOther={form.referralOther}
                onSourceChange={val => handleChange('referralSource', val)}
                onOtherChange={val => handleChange('referralOther', val)}
              />
            )}

            <div className="fixed bottom-0 left-0 w-full px-4 py-6 bg-white border-t z-10">
              <div className="max-w-xl mx-auto">
                {step < 8 && <Button onClick={handleNext} className="w-full">Next</Button>}
                {step === 8 && (
                  <Button onClick={handleSubmit} disabled={uploading} className="w-full">
                    {uploading ? 'Creating...' : 'Create Memorial Page'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>)}
    </div>
  )
}
