'use client'

import { Textarea } from '@/components/ui/textarea'

export function StepTribute({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-medium mb-2">Share a short tribute or memory</h2>
            <Textarea
                placeholder="Write a short tribute..."
                value={value}
                maxLength={300}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}
