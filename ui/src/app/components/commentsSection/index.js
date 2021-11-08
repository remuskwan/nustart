import { useState } from "react"
import Comment from "../comment"
import api from "../../util/api"

export default function CommentsSection({ user, comments, guideId, setGuide, setComments }) {
  const [comment, setComment] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    addComment()
  }

  function addComment() {
    api.createComment(guideId, {
      content: comment,
      creator: user,
    })
      .then((response) => setGuide(response.data))
      .catch((error) => setError(error))
  }

  return (
    <section aria-labelledby="comments-title" className="mt-8 xl:mt-10">
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Comments
            </h2>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <ul className="space-y-8">
              {!comments.length ?
                <li key="No comments">
                  <div className="flex space-x-3">
                    <div>
                      <div className="text-sm">
                        No comments
                      </div>
                    </div>
                  </div>
                </li>
                : comments.map((comment) => (
                  <Comment
                    user={user}
                    comment={comment}
                    guideId={guideId}
                    setGuide={setGuide}
                    setComments={setComments} />
                ))}
            </ul>
          </div>

        </div>
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="comment" className="sr-only">
                    Comments
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    className="shadow-sm block w-full focus:ring-rose-500 focus:border-rose-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Write a comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}