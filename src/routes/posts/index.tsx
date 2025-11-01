import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { compareDesc, parseISO } from 'date-fns'

export const Route = createFileRoute('/posts/')({
  loader: () => {
    return allPosts
      .filter((blog) => blog.published)
      .sort((a, b) =>
        compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)),
      )
  },
  component: RouteComponent,
})

function RouteComponent() {
  const posts = Route.useLoaderData()
  console.log('posts:', posts)
  return <div>Hello "/posts/"!</div>
}
