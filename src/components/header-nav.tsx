import { headerNav } from '@/config/header-nav'
import { siteMetadata } from '@/config/site-metadata'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { SquareLibrary } from 'lucide-react'

export function HeaderNav() {
  return (
    <header
      className={cn(
        'flex items-center bg-white dark:bg-gray-950 justify-between py-10',
        {
          'sticky top-0 z-50': siteMetadata.stickyNav,
        },
      )}
    >
      <Link to="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <SquareLibrary className="size-6" />
          </div>
          <div className="hidden text-2xl font-semibold sm:block">
            {siteMetadata.headerTitle}
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNav
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </div>
        {/* <SearchButton />
        <ThemeSwitch />
        <MobileNav /> */}
      </div>
    </header>
  )
}
