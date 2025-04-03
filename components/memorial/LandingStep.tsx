'use client'

import { Button } from '@/components/ui/button'

export function LandingStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="text-center py-50">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Memorially</h1>
            <p className="text-muted-foreground mb-6">Create a tribute page for a loved one</p>
            <Button size="lg" onClick={onNext}>
                Start a Memorial
            </Button>
        </div>
    )
}
