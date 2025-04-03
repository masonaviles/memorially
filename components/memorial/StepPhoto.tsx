import { Input } from '@/components/ui/input'

export function StepPhoto({ onChange }: { onChange: (file: File | null) => void }) {
    return (
        <div className="space-y-2">
            <h2 className="text-lg font-medium mb-2">Would you like to upload a photo of them?</h2>
            <Input
                type="file"
                onChange={e => onChange(e.target.files?.[0] || null)}
            />
        </div>
    )
}
