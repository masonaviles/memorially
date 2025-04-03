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
            <select
                className="w-full border p-2 rounded-md"
                value={referralSource}
                onChange={e => onSourceChange(e.target.value)}
            >
                <option value="">How did you hear about us?</option>
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