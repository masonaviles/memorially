import { Input } from '@/components/ui/input'

export function StepDeceasedName({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-medium mb-2">Who are you creating this memorial for?</h2>
            <Input
                placeholder="First and last"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}