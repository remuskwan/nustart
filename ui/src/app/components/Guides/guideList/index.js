import { Link } from 'react-router-dom'
import {
  PlusIcon,
} from '@heroicons/react/solid'
import Guide from '../guide'

export default function GuideList({ user, items, setGuides }) {
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">No guides</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new guide.</p>
          <div className="mt-6">
            <Link
              to={`/createGuide`}>
              <button
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Guide
              </button>
            </Link>
          </div>
        </div>
      )
      : (
        <div className="mt-4">
          <h1 className="sr-only">Guides</h1>
          <ul className="space-y-4">
            {items.map((guide) => (
              <li key={guide.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
                <Guide
                  user={user}
                  id={guide.id}
                  title={guide.title}
                  content={guide.content}
                  creator={guide.creator}
                  created={guide.dateCreated}
                  setGuides={setGuides}
                  guide={guide}
                />
              </li>
            ))}
          </ul>
        </div>
      )
  )
}