// app/start/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db, storage } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function StartMemorial() {
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    ownerName: '',
    deceasedName: '',
    photo: null as File | null,
    tribute: '',
    serviceDate: '',
    location: '',
    allowRSVP: 'rsvp_wall',
    referralSource: '',
    referralOther: ''
  })
  const [uploading, setUploading] = useState(false)

  const handleNext = () => setStep(prev => prev + 1)
  const handleChange = (field: string, value: any) =>
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
    <div className="max-w-xl mx-auto px-4 py-10 text-center">
      {step === 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Memorially</h1>
          <Button onClick={handleNext}>Start a Memorial</Button>
        </>
      ) : (
        <div className="text-left">
          <h1 className="text-2xl font-semibold mb-6">Start a Memorial</h1>
          <p className="mb-4 text-muted-foreground">Step {step} of 8</p>

          {step === 1 && (
            <Input
              placeholder="Your name"
              value={form.ownerName}
              onChange={e => handleChange('ownerName', e.target.value)}
            />
          )}

          {step === 2 && (
            <Input
              placeholder="Their full name"
              value={form.deceasedName}
              onChange={e => handleChange('deceasedName', e.target.value)}
            />
          )}

          {step === 3 && (
            <Input type="file" onChange={e => handleChange('photo', e.target.files?.[0] || null)} />
          )}

          {step === 4 && (
            <Textarea
              placeholder="Write a short tribute..."
              value={form.tribute}
              maxLength={300}
              onChange={e => handleChange('tribute', e.target.value)}
            />
          )}

          {step === 5 && (
            <Input
              type="datetime-local"
              value={form.serviceDate}
              onChange={e => handleChange('serviceDate', e.target.value)}
            />
          )}

          {step === 6 && (
            <Input
              placeholder="Location or stream link"
              value={form.location}
              onChange={e => handleChange('location', e.target.value)}
            />
          )}

          {step === 7 && (
            <select
              className="w-full border p-2 rounded-md"
              value={form.allowRSVP}
              onChange={e => handleChange('allowRSVP', e.target.value)}
            >
              <option value="rsvp_wall">RSVP + Tribute Wall</option>
              <option value="wall_only">Tribute Wall Only</option>
              <option value="none">No Guest Interaction</option>
            </select>
          )}

          {step === 8 && (
            <div className="space-y-4">
              <select
                className="w-full border p-2 rounded-md"
                value={form.referralSource}
                onChange={e => handleChange('referralSource', e.target.value)}
              >
                <option value="">How did you hear about us?</option>
                <option value="google">Google search</option>
                <option value="friend">A friend or family</option>
                <option value="funeral_home">Funeral home</option>
                <option value="hospice">Hospice or care provider</option>
                <option value="social">Social media</option>
                <option value="other">Other</option>
              </select>

              {form.referralSource === 'other' && (
                <Input
                  placeholder="Please specify..."
                  value={form.referralOther}
                  onChange={e => handleChange('referralOther', e.target.value)}
                />
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end gap-4">
            {step < 8 && <Button onClick={handleNext}>Next</Button>}
            {step === 8 && (
              <Button onClick={handleSubmit} disabled={uploading}>
                {uploading ? 'Creating...' : 'Create Memorial Page'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}