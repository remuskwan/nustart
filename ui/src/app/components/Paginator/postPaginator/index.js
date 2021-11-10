import { Fragment, useEffect, useState } from 'react'
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PostsPaginator({ data, component: Component, pageLimit, dataLimit, ...rest }) {
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const goToNextPage = () => setCurrentPage((page) => page + 1)
  const goToPreviousPage = () => setCurrentPage((page) => page - 1)
  const changePage = (evt) => {
    const pageNumber = Number(evt.target.textContent)
    setCurrentPage(pageNumber)
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  }
  const getStartPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pages > pageLimit ? pageLimit : pages).fill().map((_, idx) => start + idx + 1)
  }

  const getEndPaginationGroup = () => {
    let start = Math.floor((pages - pageLimit - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  useEffect(() => {
    setPages(Math.ceil(data.length / dataLimit))
  }, [data.length, dataLimit])

  return (
    <Fragment>
      <Component items={getPaginatedData()} {...rest} />
      {pages > 1 &&
        <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
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
          <div className="hidden md:-mt-px md:flex">
            {getStartPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={classNames(
                  currentPage === item ? "border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "border-transparent border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium")}
              >
                {item}
              </button>
            ))}
            {pages > (2 * pageLimit) &&
              <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                ...
              </span>
            }
            {pages > pageLimit &&
              getEndPaginationGroup().map((item, index) => (
                <button
                  key={index}
                  onClick={changePage}
                  className={classNames(
                    currentPage === item ? "border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "border-transparent border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium")}
                >
                  {item}
                </button>
              ))}
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
