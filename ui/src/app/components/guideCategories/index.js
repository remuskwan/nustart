import { Link } from 'react-router-dom'
import { DotsVerticalIcon,  PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'

const projects = [
  { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
  { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
  { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
  { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GuideCategories({ categories }) {
  return (
    // <div>
    //   <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Categories</h2>
    //   <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
    //     {categories.map((cat) => (
    //       <li key={cat.name} className="col-span-1 flex shadow-sm rounded-md">
    //         <div
    //           className={classNames(
    //             cat.bgColor,
    //             'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
    //           )}
    //         >
    //           {/* {cat.name.split(" ").forEach()} */}
    //         </div>
    //         <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
    //           <div className="flex-1 px-4 py-2 text-sm truncate">
    //             <a href={cat.href} className="text-gray-900 font-medium hover:text-gray-600">
    //               {cat.name}
    //             </a>
    //           </div>
    //           <div className="flex-shrink-0 pr-2">
    //             <button
    //               type="button"
    //               className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //             >
    //               <span className="sr-only">Open options</span>
    //               <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
    //             </button>
    //           </div>
    //         </div>
    //       </li>
    //     ))}
    //     <li key="Add category" className="col-span-1 flex shadow-sm rounded-md">
    //       <Link to='/guides/categories/create'>
    //       <button
    //         type="button"
    //         className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //       >
    //         <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
    //       </button>
    //       </Link>
    //     </li>
    //   </ul>
    // </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
    {categories.map((person) => (
      <div
        key={person.id}
        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      >
        <div className="flex-1 min-w-0">
          <a href="#" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{person.name}</p>
          </a>
        </div>
      </div>
    ))}
  </div>
  )
}
