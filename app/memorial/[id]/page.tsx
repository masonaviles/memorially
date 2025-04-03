// app/memorial/[id]/page.tsx
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { notFound } from 'next/navigation'

export default async function MemorialPage({ params }: { params: { id: string } }) {
    const { id } = params

    const docRef = doc(db, 'memorials', id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) return notFound()

    const data = snapshot.data()

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">{data.deceasedName}</h1>
            {data.photoURL && <img src={data.photoURL} alt={data.deceasedName} className="rounded-lg mb-4" />}
            <p className="mb-4">{data.tribute}</p>
            {data.serviceDate && <p className="text-muted-foreground">Service: {new Date(data.serviceDate).toLocaleString()}</p>}
            {data.location && <p className="text-muted-foreground">Location: {data.location}</p>}
            {data.stream && <p className="text-muted-foreground">Stream: <a href={data.stream} className="underline" target="_blank">{data.stream}</a></p>}
        </div>
    )
}
