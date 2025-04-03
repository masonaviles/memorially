'use client'

import { Textarea } from '@/components/ui/textarea'

const MAX_LENGTH = 2000

export function StepTribute({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <div className="flex flex-col h-[calc(100vh-12em)]"> {/* Adjust height to stop above fixed footer */}
            <h2 className="text-lg font-medium mb-2">Share a short tribute or memory</h2>
            <div className="flex-1 overflow-hidden relative">
                <Textarea
                    placeholder="Write a heartfelt tribute to celebrate their life..."
                    value={value}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_LENGTH) onChange(e.target.value)
                    }}
                    className="h-full w-full resize-none overflow-y-auto text-base"
                />
            </div>
            <div className="text-sm text-muted-foreground text-right mt-1">
                {value.length} / {MAX_LENGTH} characters
            </div>
        </div>
    )
}
