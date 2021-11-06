import { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { removeUserSession } from '../../util/Common'

const user = {
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileDropDown({ user }) {
  const history = useHistory()
  return (
    <Menu as="div" className="flex-shrink-0 relative ml-5">
      <div>
        <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
          <Menu.Item key='Your Profile'>
              {({ active }) => (
                <Link
                  to={`/profile/${user.id}`}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block py-2 px-4 text-sm text-gray-700'
                  )}>
                  Your Profile
                </Link>
              )}
            </Menu.Item>
          <Menu.Item key='Sign out'>
            {({ active }) => (
              <button
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'w-full text-left py-2 px-4 text-sm text-gray-700'
                )}
                onClick={() => {
                  removeUserSession()
                  history.push("/login")
                }}>
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}