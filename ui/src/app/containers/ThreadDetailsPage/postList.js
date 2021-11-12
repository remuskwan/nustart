import moment from 'moment'
import { Link, useRouteMatch } from 'react-router-dom'
import {
  ChatAltIcon,
  EyeIcon,
  PlusIcon,
  ShareIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'

import PostOptions from "./postOptions"
import Post from '../../components/post'
export default function PostList({ user, setUser, items, forumId, threadId, setThread, setPosts }) {
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">No posts</h3>
        </div>
      )
      : (
        <div className="mt-4">
          <h1 className="sr-only">Posts</h1>
          <ul className="space-y-4">
            {items.map((post) => (
              <Post
              user={user}
              setUser={setUser}
                forumId={forumId}
                threadId={threadId}
                post={post}
                setThread={setThread}
                setPosts={setPosts}
              />
            ))}
          </ul>
        </div>
      )
  )
}