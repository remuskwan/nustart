import { Link } from "react-router-dom"
import moment from "moment"
import CommentOptions from "../commentOptions"

export default function Comment({ user, comment, guideId, setGuide, setComments }) {
  return (
    <li key={comment.id}>
      <div className="flex space-x-3">
        <div className="min-w-0 flex-1">
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
            <button type="button" className="text-gray-900 font-medium">
              Reply
            </button>
          </div>
        </div>
        {(user.id === comment.creator.id || user.accountType === "ADMIN") &&
          <div className="flex-shrink-0 self-center flex">
            <CommentOptions comment={comment} guideId={guideId} setGuide={setGuide} setComments={setComments} />
          </div>
        }
      </div>
    </li>
  )
}