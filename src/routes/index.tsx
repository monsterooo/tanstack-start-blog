import { siteMetadata } from '@/config/site-metadata'
import { createFileRoute, Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { format } from 'date-fns'

export const Route = createFileRoute('/')({
  component: App,
  loader: () => allPosts.filter((blog) => blog.published),
})

const MAX_DISPLAY = 5

function App() {
  const posts = Route.useLoaderData()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Latest
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}

        {posts.slice(0, MAX_DISPLAY).map((post) => (
          <li key={post.slug} className="py-12">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={post.publishedAt}>
                      {format(post.publishedAt, 'MMMM dd, yyyy', {
                        locale: siteMetadata.locale,
                      })}
                    </time>
                  </dd>
                </dl>

                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl leading-8 font-bold tracking-tight">
                        <Link
                          to={`/`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap">
                        {post.tags?.map((tag) => (
                          <Link
                            to={`/`}
                            className="text-primary hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                          >
                            {tag.split(' ').join('-')}
                          </Link>
                        ))}
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {post.summary}
                      </div>
                    </div>
                    <div className="text-base leading-6 font-medium">
                      <Link
                        to={`/`}
                        className="text-primary hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read more: "${post.title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
