import { Fragment, useState, useEffect } from 'react'

export default function ThreadsPaginator({ data, component: Component, dataLimit }) {
  const [pages, setPages] = useState(Math.ceil(data.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = currentPage * dataLimit - dataLimit
  const endIndex = startIndex + dataLimit

  const goToNextPage = () => setCurrentPage((page) => page + 1)
  const goToPreviousPage = () => setCurrentPage((page) => page - 1)

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return data.slice(startIndex, endIndex)
  }
  useEffect(() => {
    setPages(Math.ceil(data.length / dataLimit))
  }, [data.length, dataLimit])

  return (
    <Fragment>
      <div className="dataContainer">
        <Component items={getPaginatedData()} />
      </div>
      {data.length > 0 && <nav
        className="bg-white shadow overflow-hidden px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:rounded-b-md sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{data.length > endIndex ? (endIndex) : data.length}</span> of{' '}
            <span className="font-medium">{data.length}</span> results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          {currentPage !== 1 &&
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={goToPreviousPage}
            >
              Previous
            </button>
          }
          {(currentPage !== pages && pages > 1) &&
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={goToNextPage}
            >
              Next
            </button>
            }
        </div>
      </nav>}

    </Fragment>

  )
}
