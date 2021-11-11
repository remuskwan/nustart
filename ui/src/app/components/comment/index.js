import { useState } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import CommentOptions from "../commentOptions"
import api from "../../util/api"

export default function Comment({ user, comment, guideId, setGuide, setComments }) {
  const [edit, setEdit] = useState(false)
  const [editComment, setEditComment] = useState(comment.content)
  const [error, setError] = useState(null)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    updateComment()
    setEdit(false)
  }

  function updateComment() {
    comment.content = editComment
    // console.log(comment)
    api.editComment(guideId, comment)
      .then((response) => {
        setGuide(response.data)
        // console.log(response.data)
        setComments(response.data.comments)
      })
      .catch(error => setError(error))
  }

  return (
    <li key={comment.id}>
      <div className="flex space-x-3">
        {!edit ?
          <>
            <div className="flex-shrink-0">
              {comment.creator.profilePicture === "default"
                ?
                <div className="flex justify-center items-center content-center bg-gradient-to-br from-rose-300 to-rose-600 shadow-md hover:shadow-lg h-10 w-10 rounded-full fill-current text-white">
                  <h2 className="text-xs">{comment.creator.username.substring(0, 1)}</h2>
                </div>
                :
                <img
                  className="h-10 w-10 rounded-full"
                  src={comment.creator.profilePicture}
                  alt={comment.creator.username.substring(0, 1)}
                />
              }
            </div>
            <div className="min-w-0 flex-1">
              <div>
                <div className="text-sm">
                  <Link to={`/profile/${comment.creator.id}`} className="font-medium text-gray-900">
                    {comment.creator.username}
                  </Link>
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{comment.content}</p>
                </div>
                <div className="mt-2 text-sm space-x-2">
                  <span className="text-gray-500 font-medium">{moment().subtract(moment().diff(comment.created.slice(0, -5))).calendar()}</span>{' '}
                  <span className="text-gray-500 font-medium">&middot;</span>{' '}
                </div>
              </div>
            </div>
          </>
          :
          <div className="min-w-0 flex-1">
            <form onSubmit={handleSubmit}>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="shadow-sm block w-full focus:ring-rose-500 focus:border-rose-500 sm:text-sm border border-gray-300 rounded-md"
                placeholder="Write a comment"
                required
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
              <div className="mt-3 flex items-center justify-end">
                <button
                  type="button"
                  className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-5 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        }

        {(user.id === comment.creator.id || user.accountType === "ADMIN") &&
          <div className="flex-shrink-0 self-center flex">
            <CommentOptions
              edit={edit}
              setEdit={setEdit}
              comment={comment}
              guideId={guideId}
              setGuide={setGuide}
              setComments={setComments} />
          </div>
        }
      </div>
    </li>
  )
}