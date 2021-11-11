import { Link } from "react-router-dom"

export default function NewButton({content, path}) {
  return (
    <Link to={path}>
      <button
      className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
    >
      New {content.charAt(0).toUpperCase() + content.slice(1)}
    </button>
    </Link>
  )
}