import { Link, useRouteMatch } from "react-router-dom"
import ForumOptions from "./forumOptions"

export default function ForumList({ items, contentType, setForums, user }) {
  const { url } = useRouteMatch()
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No {contentType}</h3>
            {/* <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Project
            </button>
          </div> */}
          </div>
        )
        : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    to={`${url}${url === '/' ? '' : '/'}${item.id}/threads`}
                    className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500 truncate">{item.description}</p>
                  </Link>
                </div>
                {(user && user.accountType === "ADMIN") &&
                  <div className="flex-shrink-0 self-center flex">
                    <ForumOptions
                      forum={item}
                      setForums={setForums} />
                  </div>
                }

              </div>
            )
            )}
          </div>
        )
      }
    </div>
  )
}