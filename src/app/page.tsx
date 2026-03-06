import { getDocuments, getSingletonBySlug } from 'outstatic/server'
import { HomeClient } from '@/components/HomeClient'

export default async function Home() {
  const homepage = getSingletonBySlug('home') || {}
  const posts = getDocuments('posts', ['title', 'slug', 'coverImage', 'date', 'description', 'publishedAt'])

  return <HomeClient homepage={homepage} posts={posts} />
}
