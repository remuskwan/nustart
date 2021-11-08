import { Fragment, useEffect, useState } from 'react'

import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import api from '../../util/api'
import CategoriesTable from '../../components/categoriesTable'
import AddCategoryModal from '../../components/createCatModal'
import NewButton from '../../components/newButton'
import { useRouteMatch } from 'react-router'

const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CategoriesPage() {
  const {url} = useRouteMatch()
  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => (
        setError(error)
      ))
  }, [])

  useEffect(() => {
    api.getCategories()
      .then((response) =>
        setCategories(response.data)
      )
      .catch((error) => (
        setError(error)
      ))
  }, [])

  if (error) return `Error: ${error.message}`

  return (
    user &&
    <Fragment>
      <div className="relative min-h-screen bg-gray-100">
        <NavBar
          buttonContent="forum"
          disableButton={user.accountType !== "ADMIN"}
          component={
            <NewButton content='category' path={`${url}/create`}/>
          }
          user={user}
        />
        <div className="py-10">
          <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <SideBar user={user} />
            </div>
            <main className="lg:col-span-9 xl:col-span-10">
              <div className="px-4 sm:px-0">
                <div className="sm:hidden">
                  <label htmlFor="question-tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="question-tabs"
                    className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? 'page' : undefined}
                        className={classNames(
                          tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                          tabIdx === 0 ? 'rounded-l-lg' : '',
                          tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                          'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.current ? 'bg-rose-500' : 'bg-transparent',
                            'absolute inset-x-0 bottom-0 h-0.5'
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="sr-only">Categories</h1>
                <CategoriesTable items={categories} dataLimit={10}/>
              </div>
            </main>
          </div>
        </div>
      </div>
      {/* <AddCategoryModal open={open} setOpen={setOpen} setCategories={setCategories} /> */}
    </Fragment>
  )
}