import { useState } from 'react'
import { CalendarIcon, PlusIcon, UserIcon } from '@heroicons/react/solid'
import { Link, useRouteMatch } from 'react-router-dom'
import moment from "moment"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ThreadList({ items }) {
  const { url } = useRouteMatch()
  const [sortType, setSortType] = useState("date")

  const sortItems = type => {
    const sorted = [...items]
      .map((item) => new Date(JSON.parse(item.createdAt)))
      // .sort((x, y) => )
      .sort((x, y) => x === y ? 0 : x ? -1 : 1)
  }

  return (
    <div>
      {!items || !items.length
        ? (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No threads</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new thread.</p>
            <div className="mt-6">
              <Link to={`${url}/create`}>
                <button
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Thread
                </button>
              </Link>
            </div>
          </div>
        )
        : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {items.map((thread) => (
                <li key={thread.id}>
                  <Link
                    to={`${url}/${thread.id}/posts`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-rose-600 truncate">{thread.title}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={classNames(
                            thread.closed ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800",
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full")}>
                            {thread.closed ? "Closed" : "Open"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {thread.creator.username}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {moment().subtract(moment().diff(thread.created.slice(0, -5))).calendar()}
                          </p>
                        </div>
                      </div>

                    </div>
                  </Link>
                  {/* <div className="flex-shrink-0 self-center flex">
                        <ThreadOptions
                          items={props.items}
                          forum={props.forum}
                          thread={props.item}
                          action={props.setForums} />
                      </div> */}
                </li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  )
}