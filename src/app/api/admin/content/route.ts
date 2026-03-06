import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

const CONTENT_PATH = path.join(process.cwd(), 'outstatic/content')
const IMAGES_PATH = path.join(process.cwd(), 'public/images')

export async function POST(request: Request) {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
    }

    try {
        const body = await request.json()
        const { action, collection, slug, ...data } = body

        if (action === 'read') {
            if (collection && slug) {
                // Read specific document
                let filePath = path.join(CONTENT_PATH, collection, `${slug}.md`)
                if (collection === 'homepage') {
                    filePath = path.join(CONTENT_PATH, '_singletons', 'homepage.md')
                }

                if (!fs.existsSync(filePath)) {
                    return NextResponse.json({ error: 'File not found' }, { status: 404 })
                }

                const fileContent = fs.readFileSync(filePath, 'utf-8')
                const parsed = matter(fileContent)
                return NextResponse.json({ ...parsed.data, content: parsed.content })
            } else if (collection) {
                // List documents
                const collectionPath = path.join(CONTENT_PATH, collection)
                if (!fs.existsSync(collectionPath)) {
                    return NextResponse.json([])
                }

                const files = fs.readdirSync(collectionPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
                const docs = files.map(f => {
                    const fullPath = path.join(collectionPath, f)
                    const fileContent = fs.readFileSync(fullPath, 'utf-8')
                    const parsed = matter(fileContent)
                    return {
                        slug: f.replace(/\.mdx?$/, ''),
                        title: parsed.data.title || f,
                        status: parsed.data.status || 'published',
                        publishedAt: parsed.data.publishedAt || new Date().toISOString()
                    }
                })
                return NextResponse.json(docs)
            } else {
                const folders = fs.readdirSync(CONTENT_PATH, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory() && dirent.name !== '_singletons' && dirent.name !== 'settings')
                    .map(dirent => dirent.name)
                return NextResponse.json([...folders, 'homepage'])
            }
        } else if (action === 'save') {
            if (!collection || !slug) {
                return NextResponse.json({ error: 'Missing collection or slug' }, { status: 400 })
            }

            let filePath = path.join(CONTENT_PATH, collection, `${slug}.md`)
            if (collection === 'homepage') {
                filePath = path.join(CONTENT_PATH, '_singletons', 'homepage.md')
            }

            const { content, ...frontmatter } = data
            const fileContent = matter.stringify(content || '', frontmatter)

            const dir = path.dirname(filePath)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true })
            }

            fs.writeFileSync(filePath, fileContent, 'utf-8')
            return NextResponse.json({ success: true })
        } else if (action === 'list_images') {
            if (!fs.existsSync(IMAGES_PATH)) {
                return NextResponse.json([])
            }
            const files = fs.readdirSync(IMAGES_PATH)
                .filter(f => /\.(webp|jpg|jpeg|png|gif|svg)$/i.test(f))
                .map(f => `/images/${f}`)
            return NextResponse.json(files)
        } else if (action === 'upload_image') {
            const { fileName, base64 } = data
            if (!fileName || !base64) {
                return NextResponse.json({ error: 'Missing fileName or base64' }, { status: 400 })
            }

            const buffer = Buffer.from(base64.split(',')[1], 'base64')
            const filePath = path.join(IMAGES_PATH, fileName)

            if (!fs.existsSync(IMAGES_PATH)) {
                fs.mkdirSync(IMAGES_PATH, { recursive: true })
            }

            fs.writeFileSync(filePath, buffer)
            return NextResponse.json({ url: `/images/${fileName}` })
        } else if (action === 'delete_image') {
            const { url } = data
            if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 })

            const fileName = path.basename(url)
            const filePath = path.join(IMAGES_PATH, fileName)

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
                return NextResponse.json({ success: true })
            }
            return NextResponse.json({ error: 'File not found' }, { status: 404 })
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

