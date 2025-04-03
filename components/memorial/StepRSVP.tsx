'use client'

import { Button } from '@/components/ui/button'

export function StepRSVP({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    const options = [
        { label: 'RSVP + Tribute Wall', value: 'rsvp_wall' },
        { label: 'Tribute Wall Only', value: 'wall_only' },
        { label: 'No Guest Interaction', value: 'none' }
    ]

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium mb-2">Would you like to allow guests to RSVP or leave messages?</h2>
            <div className="flex flex-col gap-2">
                {options.map(option => (
                    <Button
                        key={option.value}
                        variant={value === option.value ? 'default' : 'outline'}
                        onClick={() => onChange(option.value)}
                        className="w-full justify-start"
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
    )
}
