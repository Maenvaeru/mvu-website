import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getDocuments } from 'outstatic/server'
import { HomeClient } from '@/components/HomeClient'

export default async function Home() {
  // Direct read to bypass Outstatic indexing issues
  const filePath = path.join(process.cwd(), 'outstatic/content/_singletons/homepage.md')
  let homepage = {}

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const parsed = matter(fileContent)
    homepage = { ...parsed.data, content: parsed.content }
  }

  const posts = getDocuments('posts', ['title', 'slug', 'coverImage', 'date', 'description', 'publishedAt'])

  return <HomeClient homepage={homepage} posts={posts} />
}
