import type { Metadata } from 'next'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        id: string
    }
}

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const docRef = doc(db, 'memorials', params.id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        return {
            title: 'Memorial Not Found',
            description: 'This memorial page could not be found.'
        }
    }

    const data = snapshot.data()

    return {
        title: `In Memory of ${data.deceasedName}`,
        description: data.tribute || 'A tribute to a cherished life.'
    }
}

export default async function MemorialPage({ params }: PageProps) {
    const { id } = params

    const docRef = doc(db, 'memorials', id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) return notFound()

    const data = snapshot.data()

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">{data.deceasedName}</h1>
            {data.photoURL && (
                <img
                    src={data.photoURL}
                    alt={data.deceasedName}
                    className="rounded-lg mb-4"
                />
            )}
            <p className="mb-4">{data.tribute}</p>
            {data.serviceDate && (
                <p className="text-muted-foreground">
                    Service: {new Date(data.serviceDate).toLocaleString()}
                </p>
            )}
            {data.location && (
                <p className="text-muted-foreground">Location: {data.location}</p>
            )}
            {data.stream && (
                <p className="text-muted-foreground">
                    Stream:{' '}
                    <a
                        href={data.stream}
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {data.stream}
                    </a>
                </p>
            )}
        </div>
    )
}
