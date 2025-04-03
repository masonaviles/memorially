'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const options = [
    { label: 'Google search', value: 'google' },
    { label: 'A friend or family', value: 'friend' },
    { label: 'Funeral home', value: 'funeral_home' },
    { label: 'Hospice or care provider', value: 'hospice' },
    { label: 'Social media', value: 'social' },
    { label: 'Other', value: 'other' },
]

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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {options.map(option => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onSourceChange(option.value)}
                        className={cn(
                            'w-full px-4 py-2 rounded-md border text-sm',
                            referralSource === option.value
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                        )}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

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
