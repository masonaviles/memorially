'use client'

import { Input } from '@/components/ui/input'

export function StepLocation({
    location,
    stream,
    onLocationChange,
    onStreamChange,
}: {
    location: string
    stream: string
    onLocationChange: (val: string) => void
    onStreamChange: (val: string) => void
}) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-medium mb-2">Where will the memorial take place?</h2>
            <Input
                placeholder="Address (if physical service)"
                value={location}
                onChange={e => onLocationChange(e.target.value)}
            />
            <Input
                placeholder="Zoom or stream link (if online)"
                value={stream}
                onChange={e => onStreamChange(e.target.value)}
            />

        </div>
    )
}