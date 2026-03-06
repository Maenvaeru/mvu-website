import 'outstatic/outstatic.css'
import { OstClient } from './client'

export function generateStaticParams() {
    return [{ ost: [] }]
}

export default async function Page({ params }: { params: Promise<{ ost?: string[] }> }) {
    const resolvedParams = await params;

    if (process.env.NODE_ENV === 'production') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-10">
                <h1 className="text-3xl font-bold mb-4 drop-shadow-[0_0_10px_rgba(0,239,255,0.5)]">MVU AI LAB - CMS</h1>
                <p className="text-gray-400 max-w-md">
                    The admin panel is only accessible in the local development environment.
                    Run <code className="bg-white/10 px-2 py-1 rounded">cms.bat</code> to manage content.
                </p>
            </div>
        )
    }

    // Dynamic import to hide cookies() usage from static analyzer
    const { Outstatic } = await import('outstatic')
    const ostData = await Outstatic();

    return <OstClient
        ostData={ostData}
        params={{
            ...resolvedParams,
            ost: resolvedParams.ost || []
        }}
    />
}
