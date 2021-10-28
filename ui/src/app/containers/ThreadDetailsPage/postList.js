import moment from 'moment'
import { Link } from 'react-router-dom'
import {
  ChatAltIcon,
  EyeIcon,
  PlusIcon,
  ShareIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'

import PostOptions from "./postOptions"
export default function PostList({ items, forum, thread, setThread }) {
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No posts</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
            <div className="mt-6">
              <Link
                to={{
                  pathname: "/addPost",
                  state: {
                    forum: forum,
                    thread: thread
                  }
                }}>
                <button
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Post
                </button>
              </Link>
            </div>
          </div>
        )
        : (
          <div className="mt-4">
            <h1 className="sr-only">Posts</h1>
            <ul role="list" className="space-y-4">
              {items.map((post) => (
                <li key={post.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
                  <article aria-labelledby={'post-title-' + post.id}>
                    <div>
                      <div className="flex space-x-3">
                        {/* <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={post.creator.imageUrl} alt="" />
                    </div> */}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            <a href={post.creator.href} className="hover:underline">
                              {post.creator.displayName}
                            </a>
                          </p>
                          <p className="text-sm text-gray-500">
                            <a href={post.href} className="hover:underline">
                              {/* <time dateTime={post.datetime}>{post.date}</time> */}
                              {moment().subtract(moment().diff(post.publishedAt.slice(0, -5))).calendar()}
                            </a>
                          </p>
                        </div>
                        <div className="flex-shrink-0 self-center flex">
                          <PostOptions
                            forum={forum}
                            thread={thread}
                            post={post}
                            setThread={setThread}
                          />
                        </div>
                      </div>
                      <h2 id={'post-title-' + post.id} className="mt-4 text-base font-medium text-gray-900">
                        {post.content}
                      </h2>
                    </div>
                    <div
                      className="mt-2 text-sm text-gray-700 space-y-4"
                      dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                    <div className="mt-6 flex justify-between space-x-8">
                      <div className="flex space-x-6">
                        <span className="inline-flex items-center text-sm">
                          <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                            <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="font-medium text-gray-900">{post.likes}</span>
                            <span className="sr-only">likes</span>
                          </button>
                        </span>
                        <span className="inline-flex items-center text-sm">
                          <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                            <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="font-medium text-gray-900">{post.replies}</span>
                            <span className="sr-only">replies</span>
                          </button>
                        </span>
                        <span className="inline-flex items-center text-sm">
                          <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                            <EyeIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="font-medium text-gray-900">{post.views}</span>
                            <span className="sr-only">views</span>
                          </button>
                        </span>
                      </div>
                      <div className="flex text-sm">
                        <span className="inline-flex items-center text-sm">
                          <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                            <ShareIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="font-medium text-gray-900">Share</span>
                          </button>
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  )
}