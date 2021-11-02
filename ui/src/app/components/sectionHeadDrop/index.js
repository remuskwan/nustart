import { CalendarIcon, UserIcon } from "@heroicons/react/solid"
export default function SectionHeadDrop({ title, creator, date, open, menu }) {
  return (
    <div className="pb-5 border-b border-gray-200">
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <div className="sm:w-0 sm:flex-1">
          <h1 id="message-heading" className="text-lg font-medium text-gray-900">
            {title}
          </h1>
          <p className="mt-2 flex items-center text-sm text-gray-500 overflow-hidden overflow-ellipsis">
            <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            {creator}
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            {date}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          {open
            ? (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Open
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Closed
              </span>
            )}
          {menu}
        </div>
      </div>
    </div>
  )
}