'use client'

export function ProgressBar({ step, total }: { step: number; total: number }) {
    const progress = Math.min((step / total) * 100, 100)

    return (
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6 relative top-12">
            <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
