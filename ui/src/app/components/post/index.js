import moment from "moment"
import {
  ChatAltIcon,
  EyeIcon,
  PlusIcon,
  ShareIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'
import PostOptions from "../../containers/ThreadDetailsPage/postOptions"
import api from "../../util/api"

export default function Post({ user, setUser, post, forumId, threadId, setThread, setPosts }) {
  function toggleLike() {
    console.log(post.id)
    const likedPosts = user.likedPosts
    if (likedPosts.includes(post.id)) {
      likedPosts.filter((p) => parseInt(p) !== parseInt(post.id))
      post.likes = post.likes - 1
    } else {
      likedPosts.push(post.id)
      post.likes = post.likes + 1
    }
    user.likedPosts = likedPosts
    console.log(user)
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
            {/* <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={post.creator.imageUrl} alt="" />
                    </div> */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {post.creator.username}
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
  )
}