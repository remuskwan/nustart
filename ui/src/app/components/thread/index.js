import { CalendarIcon, UserIcon } from '@heroicons/react/solid'
import { Link, useRouteMatch } from 'react-router-dom'
import moment from "moment"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Thread({ thread }) {
  const { url } = useRouteMatch()

  return (
    <li key={thread.id}>
      <Link
        to={`${url}/${thread.id}/posts`}
        className="block hover:bg-gray-50"
      >
        <div className={classNames(
          thread.pinned && "bg-indigo-50",
          "px-4 py-4 sm:px-6")}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium truncate">{thread.title}</p>
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
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <p>
                {thread.posts.length} post{thread.posts.length !== 1 && 's'}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}