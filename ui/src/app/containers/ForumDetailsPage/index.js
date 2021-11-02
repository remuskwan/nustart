import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import ThreadList from './threadList';
import Breadcrumb from '../../components/breadcrumb';

const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ForumDetailsPage() {
  const { id } = useParams()
  const { url } = useRouteMatch()
  const [forum, setForum] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    axios.get(`http://localhost:8080/NUStartApplication-war/webresources/forums/${id}`)
      .then((response) =>
        setForum(response.data)
      )
      .catch((error) => (
        setError(error)
      ))
  }, [])

  if (error) return (error.message)

  return (
    <div className="relative min-h-screen bg-gray-100">
      <NavBar
        buttonContent="thread"
        component={
          forum &&
          <Link to={`${url}/create`}>
            <button
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              New Thread
            </button>
          </Link>
        }
      />
      <Breadcrumb />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar />
          </div>
          {forum &&
            <main className="lg:col-span-9 xl:col-span-10">
              
              <div className="pb-5 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{forum.title}</h3>
                <p className="mt-2 max-w-4xl text-sm text-gray-500">
                  {forum.description}
                </p>
              </div>
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
                <h1 className="sr-only">Threads</h1>
                <ThreadList
                  items={forum.threads}
                  forum={forum}
                  contentType="threads" />
              </div>
            </main>
          }

        </div>
      </div>
    </div>
  )
}