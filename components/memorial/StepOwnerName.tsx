'use client'

import { Input } from '@/components/ui/input'

export function StepOwnerName({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return <Input placeholder="Your name" value={value} onChange={e => onChange(e.target.value)} />
}