import { Link, useRouteMatch } from 'react-router-dom'
import moment from 'moment'
import {
  ChatAltIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Guide({ id, title, creator, created, guide }) {
  const { url } = useRouteMatch()
  return (
    <Link to={`${url}/${id}`}>
      <article aria-labelledby={'guide-title-' + id}>
        <div className="flex">
          {guide.pictureUrl !== "" &&
            <div className="mr-5 flex-1">
              <img
                src={guide.pictureUrl}
                alt=""
                className={classNames(
                  guide.current ? '' : 'group-hover:opacity-75',
                  'object-cover pointer-events-none'
                )}
              />
            </div>}
          <div className="flex-1">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                {guide.creator.profilePicture === "default"
                  ?
                  <div className="flex justify-center items-center content-center bg-gradient-to-br from-rose-300 to-rose-600 shadow-md hover:shadow-lg h-10 w-10 rounded-full fill-current text-white">
                    <h2 className="text-xs">{guide.creator.username.substring(0, 1)}</h2>
                  </div>
                  :
                  <img
                    className="h-10 w-10 rounded-full"
                    src={guide.creator.profilePicture}
                    alt={guide.creator.username.substring(0, 1)}
                  />
                }
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  <Link to={`/profile/${creator.id}`} className="hover:underline">
                    {creator.username}
                  </Link>
                </p>
                <p className="text-sm text-gray-500">
                  <p className="hover:underline">
                    {moment().subtract(moment().diff(created.slice(0, -5))).calendar()}
                  </p>
                </p>
              </div>
            </div>
            <h2 id={'guide-title-' + id} className="mt-4 text-base font-medium text-gray-900">
              {title}
            </h2>
          </div>
        </div>
        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                {/* <span className="font-medium text-gray-900">{post.likes}</span> */}
                {/* <span className="sr-only">likes</span> */}
              </button>
            </span>
            <span className="inline-flex items-center text-sm">
              <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">{guide.comments.length}</span>
                <span className="sr-only">comments</span>
              </button>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}