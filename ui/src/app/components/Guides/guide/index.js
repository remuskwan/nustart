import { Link, useRouteMatch } from 'react-router-dom'
import moment from 'moment'
import {
  ChatAltIcon,
  EyeIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'

export default function Guide({ id, title, creator, created, guide }) {
  const {url} = useRouteMatch()
  return (
    <Link to={`${url}/${id}`}>
     <article aria-labelledby={'guide-title-' + id}>
      <div>
        <div className="flex space-x-3">
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
        {/* <div
          className="mt-2 text-sm text-gray-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
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
          <span className="inline-flex items-center text-sm">
            <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
              {/* <span className="font-medium text-gray-900">{post.views}</span>
              <span className="sr-only">views</span> */}
            </button>
          </span>
        </div>
      </div>
    </article> 
    </Link>
  )
}