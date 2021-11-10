import { Fragment } from 'react'
import { Link, NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import { Popover } from '@headlessui/react'
import { ChatAlt2Icon, MenuIcon, HomeIcon, UserGroupIcon, XIcon } from '@heroicons/react/outline'
import { KeyIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/solid'
import ProfileDropDown from './profileDropDown'
import { removeUserSession } from '../../util/Common'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({
  component,
  disableButton = false,
  disableSearch = false,
  editProfile = false,
  user,
  userNavigation = [
    { name: 'Your Profile', path: `/profile/${user.id}` },
  ],
  searchString = "",
  searchItems,
}) {

  const history = useHistory()
  const { url } = useRouteMatch()

  const navigation = !editProfile ? [
    { name: 'Forums', path: '/', icon: ChatAlt2Icon },
    { name: 'Guides', path: '/guides', icon: HomeIcon },
    ...user.accountType === "ADMIN" ? [
      { name: 'Categories', path: '/admin/categories', icon: UserGroupIcon },
      { name: 'Users', path: '/users', icon: UserGroupIcon }
    ] : []
  ] : [
    { name: 'Account', path: '/account/edit', icon: UserCircleIcon },
    { name: 'Password', path: '/account/edit/password', icon: KeyIcon }
  ]

  return (
    <Popover
      as="header"
      className={({ open }) =>
        classNames(
          open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
          'bg-white shadow-sm lg:static lg:overflow-y-visible'
        )
      }
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="block h-8 w-auto"
                      src="https://nustart.s3.ap-southeast-1.amazonaws.com/nustartlogo.png"
                      alt="Workflow"
                    />
                  </Link>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-8">
                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <div className="w-full">
                    {!disableSearch ?
                      <Fragment>
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            id="search"
                            name="search"
                            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            value={searchString}
                            onChange={(e) => searchItems(e.target.value)}
                          />
                        </div>
                      </Fragment>
                      : <div className="h-9" />
                      }
                  </div>
                </div>
              </div>
              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-2">
                {(!disableButton && component) && component}
                {/* Profile dropdown */}
                <ProfileDropDown user={user} />
              </div>
            </div>
          </div>

          <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  aria-current={item.path === url ? 'page' : undefined}
                  className={classNames(
                    item.path === url ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                    'block rounded-md py-2 px-3 text-base font-medium'
                  )}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                <div className="ml-1">
                  <div className="text-base font-medium text-gray-800">{user && user.username}</div>
                  <div className="text-sm font-medium text-gray-500">{user && user.email}</div>
                </div>
              </div>
              <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                {userNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </NavLink>
                ))}
                <button
                  className="w-full block rounded-md py-2 px-3 text-base text-left font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => {
                    removeUserSession()
                    history.push("/login")
                  }}>
                  Sign out
                </button>
              </div>
            </div>

            <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
              {/* <a
                href="#"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"
              >
                New {props.buttonContent.charAt(0).toUpperCase() + props.buttonContent.slice(1)}
              </a> */}
              {(!disableButton && component) && component}
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}