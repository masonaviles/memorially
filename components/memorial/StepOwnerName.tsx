'use client'

import { Input } from '@/components/ui/input'

export function StepOwnerName({
    value,
    onChange
}: {
    value: string
    onChange: (val: string) => void
}) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-medium mb-2">What’s your name?</h2>
            <Input
                placeholder="First and last"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}
