import { Fragment, useEffect, useState } from 'react'
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'

export default function PostsPaginator({ data, component: Component, dataLimit, ...rest }) {
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const goToNextPage = () => setCurrentPage((page) => page + 1)
  const goToPreviousPage = () => setCurrentPage((page) => page - 1)

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  }
  useEffect(() => {
    setPages(Math.ceil(data.length / dataLimit))
  }, [data.length, dataLimit])

  return (
    <Fragment>
      <Component items={getPaginatedData()} {...rest} />
      {pages > 1 &&
        <nav className="mt-5 border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
          <div className="-mt-px w-0 flex-1 flex">
            {currentPage !== 1 &&
              <button
                className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                onClick={goToPreviousPage}
              >
                <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Previous
              </button>
            }
          </div>
          <div className="-mt-px w-0 flex-1 flex justify-end">
            {currentPage !== pages &&
              <button
                className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                onClick={goToNextPage}
              >
                Next
                <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
            }
          </div>
        </nav>}
    </Fragment>

  )
}
