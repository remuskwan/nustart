import { Link, useRouteMatch } from 'react-router-dom'

export default function GuideCategories({ categories }) {
  const { url } = useRouteMatch()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-1 min-w-0">
            <Link to={`/categories/${category.id}/guides`}>
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{category.name}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
