import { defineCollection, defineConfig } from '@content-collections/core'

const posts = defineCollection({
  name: 'posts',
  directory: 'src/content/posts',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    published: z.boolean().default(true),
    publishedAt: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
  }),
})

export default defineConfig({
  collections: [posts],
})
