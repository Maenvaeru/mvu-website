'use client'

import { OstClient as OutstaticClient } from 'outstatic/client'
import { useEffect, useState } from 'react'

export function OstClient(props: any) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // By only rendering the component after mount, we avoid server/client hydration mismatches
    // commonly caused by Radix UI's useId mismatch in Next.js Server Components.
    if (!mounted) {
        return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading CMS...</div>
    }

    return <OutstaticClient {...props} />
}
