'use client'

import { Input } from '@/components/ui/input'

export function StepService({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return <Input type="datetime-local" value={value} onChange={e => onChange(e.target.value)} />
}