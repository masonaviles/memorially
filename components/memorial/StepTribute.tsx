'use client'

import { Textarea } from '@/components/ui/textarea'

export function StepTribute({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <Textarea
            placeholder="Write a short tribute..."
            value={value}
            maxLength={300}
            onChange={e => onChange(e.target.value)}
        />
    )
}