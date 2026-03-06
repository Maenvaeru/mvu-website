import { getDocumentBySlug, getDocumentPaths } from 'outstatic/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
    const paths = getDocumentPaths('posts');
    return paths.map((path) => ({
        slug: path.params.slug,
    }));
}

export default async function SubPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = getDocumentBySlug('posts', resolvedParams.slug, ['title', 'date', 'publishedAt', 'content', 'author', 'coverImage']);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen py-24 px-4 container mx-auto">
            <div className="w-full max-w-3xl flex flex-col">
                <Link href="/news" className="self-start mb-8 text-muted hover:text-purple transition-colors flex items-center gap-2 font-medium">
                    <ArrowLeft className="w-4 h-4" /> К списку новостей
                </Link>
                <article className="prose prose-invert lg:prose-xl prose-p:text-muted prose-headings:text-foreground prose-a:text-purple hover:prose-a:text-purple-400 w-full max-w-none">
                    <h1 className="mb-2">{post.title}</h1>
                    <div className="text-sm text-muted mb-8 pb-4 border-b border-glass-border">
                        {new Date((post.date || post.publishedAt) as string).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                        {post.author?.name && ` • ${post.author.name}`}
                    </div>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
