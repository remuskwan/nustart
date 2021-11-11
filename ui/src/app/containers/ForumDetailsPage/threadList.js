import { useRouteMatch } from 'react-router-dom'
import NewButton from '../../components/newButton'
import Thread from '../../components/thread'

export default function ThreadList({ items }) {
  const { url } = useRouteMatch()

  return (
    !items || !items.length
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
            <NewButton content='thread' path={`${url}/create`} />
          </div>
        </div>
      )
      : (
        <div className="bg-white shadow overflow-hidden sm:rounded-t-md">
          <ul className="divide-y divide-gray-200">
            {items.map((thread) => (
              <Thread thread={thread} />
            ))}
          </ul>
        </div>
      )
  )
}