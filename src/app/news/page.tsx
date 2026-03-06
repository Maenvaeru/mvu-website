import Link from "next/link";
import { getDocuments } from "outstatic/server";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { ArrowLeft } from "lucide-react";

export default async function NewsPage() {
    const posts = getDocuments('posts', ['title', 'slug', 'coverImage', 'date', 'description', 'publishedAt']);

    return (
        <div className="flex flex-col items-center w-full min-h-screen py-24 px-4 container mx-auto">
            <div className="w-full max-w-4xl flex flex-col">
                <Link href="/" className="self-start mb-8 text-muted hover:text-purple transition-colors flex items-center gap-2 font-medium">
                    <ArrowLeft className="w-4 h-4" /> На главную
                </Link>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                    Все <span className="text-purple">Новости</span>
                </h1>
                <div className="w-20 h-1 bg-purple rounded mb-12" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <GlassCard key={post.slug} className="flex flex-col h-full hover:border-purple/50 transition-colors">
                            <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                            <p className="text-xs text-muted mb-4 border-b border-glass-border pb-3 border-opacity-50">
                                {new Date((post.date || post.publishedAt) as string).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p className="text-muted mb-6 flex-1">
                                {post.description}
                            </p>
                            <Link href={`/news/${post.slug}`}>
                                <NeonButton variant="purple" className="w-full">Читать полностью</NeonButton>
                            </Link>
                        </GlassCard>
                    ))}
                    {posts.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted">
                            Новостей пока нет.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
