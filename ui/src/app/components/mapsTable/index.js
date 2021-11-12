import { Fragment, useState, useEffect } from "react"
import { Link } from "react-router-dom";
import EditCategoryModal from "../../containers/CategoriesPage/editCategory";
import api from "../../util/api";
import DeleteConfirm from "../deleteConfirm";

export default function MapsTable({ items, setSearchString, dataLimit }) {
  const [open, setOpen] = useState(false)
  const [deleteM, setDeleteM] = useState(null)
  const [error, setError] = useState(null);
  const [pages, setPages] = useState(Math.ceil(items.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = currentPage * dataLimit - dataLimit
  const endIndex = startIndex + dataLimit

  const goToNextPage = () => setCurrentPage((page) => page + 1)
  const goToPreviousPage = () => setCurrentPage((page) => page - 1)

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return items.slice(startIndex, endIndex)

  }
  function deleteMap(mapId) {
    api.deleteMap(mapId)
      .then(() => window.location.reload())
      .catch(error => setError(error))
  }

  useEffect(() => {
    setPages(Math.ceil(items.length / dataLimit))
  }, [items.length, dataLimit])

  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            {!items || !items.length
              ? (
                <div className="text-center">
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No maps</h3>
                </div>
              )
              : (
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Image URL
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Options</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getPaginatedData().map((item, itemIdx) => (
                        <tr key={item.id} className={itemIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <Link to={`/profile/${item.id}`} className="hover:underline">
                              {item.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.url}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="ml-5 text-rose-600 hover:text-rose-900"
                              onClick={() => {
                                setDeleteM(item)
                                setOpen(true)
                              }}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="6">
                          <nav
                            className="overflow-hidden px-4 py-3 flex items-center justify-between sm:px-6"
                            aria-label="Pagination"
                          >
                            <div className="hidden sm:block">
                              <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{items.length > endIndex ? (endIndex) : items.length}</span> of{' '}
                                <span className="font-medium">{items.length}</span> results
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
                          </nav>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
          </div>
        </div>
      </div>
      {deleteMap &&
        <DeleteConfirm
          title="map"
          open={open}
          setOpen={setOpen}
          cat={deleteM}
          onConfirm={deleteMap}
        />
      }
    </Fragment>
  )
}