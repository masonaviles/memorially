'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ShareMemorial({ url }: { url: string }) {
    const [email, setEmail] = useState('')
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSend = async () => {
        // TODO: implement backend endpoint to send email
        await fetch('/api/invite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, url }),
        })
        setEmail('')
        alert('Invite sent!')
    }

    return (
        <div className="space-y-4 py-6">
            <h2 className="text-xl font-semibold">Invite Others</h2>
            <div className="flex gap-2">
                <Input value={url} readOnly />
                <Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Link'}</Button>
            </div>
            <div className="flex gap-2">
                <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Button onClick={handleSend}>Send Invite</Button>
            </div>
        </div>
    )
}
