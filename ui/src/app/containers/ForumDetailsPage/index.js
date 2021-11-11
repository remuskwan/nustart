import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import ThreadList from './threadList';
import Breadcrumb from '../../components/breadcrumb';
import api from '../../util/api';
import NewButton from '../../components/newButton';
import ThreadPaginator from '../../components/Paginator/threadPaginator'

const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
]
const searchTypes = [
  { id: 1, name: 'Title', searchType: 'title' },
  { id: 2, name: 'Creator', searchType: 'creator' },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ForumDetailsPage() {
  const { id } = useParams()
  const { url } = useRouteMatch()
  const [user, setUser] = useState(null)
  const [forum, setForum] = useState(null)
  const [error, setError] = useState(null)
  const [threads, setThreads] = useState([])
  const [sortType, setSortType] = useState('created')
  const [searchString, setSearchString] = useState("")
  const [searchType, setSearchType] = useState(searchTypes[0])

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => setError(error))
  }, [])

  useEffect(() => {
    api.getForum(id)
      .then((response) => {
        const searchSortItems = (type, searchString, searchType) => {
          const types = {
            created: 'created',
            title: 'title',
            posts: 'posts'
          }
          const searchTypes = {
            title: 'title',
            creator: 'creator',
          }
          const sortProperty = types[type]
          const searchProperty = searchTypes[searchType]
          const filtered = [...response.data.threads]
            .filter((thread) => {
              if (searchString === '') {
                return thread
              } else if (searchProperty === "creator") {
                if (thread[searchProperty]["username"].toLowerCase().includes(searchString.toLowerCase())) {
                  return thread
                }
              } else if (thread[searchProperty].toLowerCase().includes(searchString.toLowerCase())) {
                return thread
              }
            })
          const sorted = [...filtered]
            .sort((x, y) =>
              sortProperty === 'posts'
                ? y['posts'].length - x['posts'].length
                : y[sortProperty].localeCompare(x[sortProperty])
                || y['created'].localeCompare(x['created']))
            .sort((x, y) => y['pinned'] - x['pinned'])
          setThreads(sorted)
        }
        setForum(response.data)
        searchSortItems(sortType, searchString, searchType.searchType)
      })
      .catch((error) => (
        setError(error)
      ))
  }, [id, sortType, searchString, searchType.searchType])

  if (error) return (error.message)

  return (
    user &&
    <div className="relative min-h-screen bg-gray-100">
      <NavBar
        buttonContent="thread"
        component={<NewButton content='thread' path={`${url}/create`} />}
        user={user}
        searchString={searchString}
        setSearchString={setSearchString}
        searchTypes={searchTypes}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <Breadcrumb />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar user={user} />
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
                <ThreadPaginator
                  data={threads}
                  component={ThreadList}
                  dataLimit={8}
                />
              </div>
            </main>
          }

        </div>
      </div>
    </div>
  )
}