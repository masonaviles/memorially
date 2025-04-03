'use client'

import { Input } from '@/components/ui/input'

export function StepService({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-medium mb-2">Do you have a date for the service yet?</h2>
            <Input
                type="datetime-local"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}
