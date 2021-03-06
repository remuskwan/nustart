import { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { removeUserSession } from '../../util/Common'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileDropDown({ user }) {
  const history = useHistory()
  return (
    <Menu as="div" className="flex-shrink-0 relative ml-5">
      <div>
        <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-rose-500">
          <span className="sr-only">Open user menu</span>
          {user.profilePicture === "default"
            ?
            <div className="max-w-md mx-auto my-3">
              <div className="flex justify-center items-center content-center bg-gradient-to-br from-pink-300 to-pink-600 hover:shadow-lg h-10 w-10 rounded-full fill-current text-white">
                <h2 style={{ fontSize: 18 }}>{user.username.substring(0, 1)}</h2>
              </div>
            </div>
            :
            <img
              className="h-10 w-10 rounded-full sm:h-10 sm:w-10"
              src={user.profilePicture}
              alt={user.username.substring(0, 1)}
            />
          }
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
              <button
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'w-full text-left py-2 px-4 text-sm text-gray-700'
                )}
                onClick={() => {
                  history.push(`/profile/${user.id}`)
                  window.location.reload()
                }}>
                Your Profile
              </button>
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