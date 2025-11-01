import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import {
  rehypeCode,
  RehypeCodeOptions,
  rehypeToc,
  remarkGfm,
  remarkHeading,
} from 'fumadocs-core/mdx-plugins'

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: 'github-dark',
    dark: 'github-dark',
  },
}

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
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm, remarkHeading],
      rehypePlugins: [rehypeToc, [rehypeCode, rehypeCodeOptions]],
    })

    return {
      ...document,
      slug: document._meta.path,
      body,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
