'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type Tribute = {
    name: string
    message: string
    attending: boolean
    createdAt: string
}

export function GuestWall({ memorialId }: { memorialId: string }) {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [attending, setAttending] = useState(true)
    const [tributes, setTributes] = useState<Tribute[]>([])

    useEffect(() => {
        const q = query(
            collection(db, 'tributes'),
            where('memorialId', '==', memorialId),
            orderBy('createdAt', 'desc')
        )
        const unsub = onSnapshot(q, snapshot => {
            setTributes(snapshot.docs.map(doc => doc.data() as Tribute))
        })
        return unsub
    }, [memorialId])

    const handleSubmit = async () => {
        if (!name.trim() || !message.trim()) return

        await addDoc(collection(db, 'tributes'), {
            memorialId,
            name,
            message,
            attending,
            createdAt: serverTimestamp(),
        })

        setName('')
        setMessage('')
        setAttending(true)
    }

    return (
        <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold">Guest Messages</h2>

            <div className="space-y-4">
                <Input
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Textarea
                    placeholder="Leave a message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={attending}
                        onChange={e => setAttending(e.target.checked)}
                    />
                    I plan to attend the memorial
                </label>
                <Button onClick={handleSubmit}>Submit Tribute</Button>
            </div>

            <div className="pt-8 border-t">
                {tributes.length > 0 ? (
                    <div className="space-y-6">
                        {tributes.map((t, i) => (
                            <div key={i} className="border-b pb-4">
                                <p className="font-medium">{t.name}</p>
                                {t.attending && <p className="text-sm text-green-600">✓ Will attend</p>}
                                <p className="mt-1">{t.message}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No tributes yet. Be the first to leave one.</p>
                )}
            </div>
        </div>
    )
}
