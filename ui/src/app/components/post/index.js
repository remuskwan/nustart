import moment from "moment"
import { Link } from "react-router-dom"
import {
  ThumbUpIcon,
} from '@heroicons/react/solid'
import PostOptions from "../../containers/ThreadDetailsPage/postOptions"
import api from "../../util/api"

export default function Post({ user, setUser, post, forumId, threadId, setThread, setPosts }) {
  function toggleLike() {
    // console.log(post.id)
    let likedPosts = user.likedPosts
    if (likedPosts.includes(post.id)) {
      likedPosts = [...likedPosts].filter((p) => p != post.id)
      post.likes = post.likes - 1
    } else {
      likedPosts = [...likedPosts].push(post.id)
      post.likes = post.likes + 1
    }
    user.likedPosts = likedPosts
    api.editUser(user.id, user)
      .then((response) => {
        setUser(response.data)
      })
    api.editPost(forumId, threadId, post)
      .then((response) => {
        setThread(response.data)
      })
  }
  return (
    <li key={post.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
      <article aria-labelledby={'post-title-' + post.id}>
        <div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
            {post.creator.profilePicture === "default"
                ?
                <div className="flex justify-center items-center content-center bg-gradient-to-br from-rose-300 to-rose-600 shadow-md hover:shadow-lg h-10 w-10 rounded-full fill-current text-white">
                  <h2 className="text-xs">{post.creator.username.substring(0, 1)}</h2>
                </div>
                :
                <img
                  className="h-10 w-10 rounded-full"
                  src={post.creator.profilePicture}
                  alt={post.creator.username.substring(0, 1)}
                />
              }
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                <Link to={`/profile/${post.creator.id}`} className="hover:underline">
                  {post.creator.username}
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                {moment().subtract(moment().diff(post.createdAt.slice(0, -5))).calendar()}
              </p>
            </div>
            <div className="flex-shrink-0 self-center flex">
              <PostOptions
                forumId={forumId}
                threadId={threadId}
                post={post}
                setThread={setThread}
                setPosts={setPosts}
              />
            </div>
          </div>
          <h2 id={'post-title-' + post.id} className="mt-4 text-base font-medium text-gray-900">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </h2>
        </div>

        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                onClick={toggleLike}
              >
                <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">{post.likes}</span>
                <span className="sr-only">likes</span>
              </button>
            </span>
          </div>
        </div>
      </article>
    </li>
  )
}