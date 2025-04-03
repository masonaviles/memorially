'use client'

export function StepRSVP({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <select className="w-full border p-2 rounded-md" value={value} onChange={e => onChange(e.target.value)}>
            <option value="rsvp_wall">RSVP + Tribute Wall</option>
            <option value="wall_only">Tribute Wall Only</option>
            <option value="none">No Guest Interaction</option>
        </select>
    )
}