import { ChatAlt2Icon, HomeIcon, TrendingUpIcon, UserGroupIcon} from '@heroicons/react/outline'
const navigation = [
  { name: 'Guides', href: '#', icon: UserGroupIcon, current: true },
  { name: 'Forums', href: '#', icon: ChatAlt2Icon, current: false },
  { name: 'Campus', href: '#', icon: HomeIcon, current: false },
  { name: 'Users', href: '#', icon: UserGroupIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideBar() {
  return (
    <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
      <div className="pb-8 space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </a>
        ))}
      </div>
      
      {/* User management panel
      <div className="pt-10">
        <p
          className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          id="communities-headline"
        >
          My communities
        </p>
        <div className="mt-3 space-y-2" aria-labelledby="communities-headline">
          {communities.map((community) => (
            <a
              key={community.name}
              href={community.href}
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">{community.name}</span>
            </a>
          ))}
        </div>
      </div> */}
    </nav>
  )
}