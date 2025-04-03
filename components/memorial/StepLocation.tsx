'use client'

import { Input } from '@/components/ui/input'

export function StepLocation({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return <Input placeholder="Location or stream link" value={value} onChange={e => onChange(e.target.value)} />
}