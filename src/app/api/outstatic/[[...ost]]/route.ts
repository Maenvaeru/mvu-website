import { NextResponse } from 'next/server'

export function generateStaticParams() {
    return [{ ost: [] }]
}

export const GET = async (req: Request, { params }: { params: Promise<{ ost?: string[] }> }) => {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Outstatic API is limited in production' })
    }
    const { OutstaticApi } = await import('outstatic')
    return OutstaticApi.GET(req, { params })
}

export const POST = async (req: Request, { params }: { params: Promise<{ ost?: string[] }> }) => {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Outstatic API is limited in production' })
    }
    const { OutstaticApi } = await import('outstatic')
    return OutstaticApi.POST(req, { params })
}
