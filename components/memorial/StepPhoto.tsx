'use client'

import Image from 'next/image'

export function StepPhoto({ }: { onChange: (file: File | null) => void }) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium mb-2">Would you like to upload a photo of them?</h2>

            {/* TEMPORARY placeholder image shown instead of file input */}
            <Image
                src="https://picsum.photos/300/300"
                alt="Temporary placeholder"
                className="rounded-md border w-full max-w-xs"
                width={300}
                height={300}
            />

            {/* 
      TODO: Re-enable when Firebase Storage is ready
      <Input
        type="file"
        onChange={e => onChange(e.target.files?.[0] || null)}
      />
      */}
        </div>
    )
}
