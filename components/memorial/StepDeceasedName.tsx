import { Input } from '@/components/ui/input'

export function StepDeceasedName({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return <Input placeholder="Their full name" value={value} onChange={e => onChange(e.target.value)} />
}