'use client'

import { Input } from '@/components/ui/input'

export function StepReferral({
    referralSource,
    referralOther,
    onSourceChange,
    onOtherChange,
}: {
    referralSource: string
    referralOther: string
    onSourceChange: (val: string) => void
    onOtherChange: (val: string) => void
}) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium mb-2">How did you hear about Memorially?</h2>
            <select
                className="w-full border p-2 rounded-md"
                value={referralSource}
                onChange={e => onSourceChange(e.target.value)}
            >
                <option value="">Select an option</option>
                <option value="google">Google search</option>
                <option value="friend">A friend or family</option>
                <option value="funeral_home">Funeral home</option>
                <option value="hospice">Hospice or care provider</option>
                <option value="social">Social media</option>
                <option value="other">Other</option>
            </select>

            {referralSource === 'other' && (
                <Input
                    placeholder="Please specify..."
                    value={referralOther}
                    onChange={e => onOtherChange(e.target.value)}
                />
            )}
        </div>
    )
}