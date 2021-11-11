import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import NewButton from '../../components/newButton'
import PostList from './postList'
import SectionHeadDrop from '../../components/sectionHeadDrop'
import Breadcrumb from '../../components/breadcrumb'
import ThreadOptions from './threadOptions'
import api from '../../util/api'
import PostPaginator from '../../components/Paginator/postPaginator'

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

export default function ThreadDetailsPage() {
  const { forumId, threadId } = useParams()
  const [user, setUser] = useState(null)
  const [forum, setForum] = useState(null)
  const [thread, setThread] = useState(null)
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(null)
  const [searchString, setSearchString] = useState("")
  const [searchType, setSearchType] = useState(searchTypes[0])
  const [sortType, setSortType] = useState('createdAt')

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => (
        setError(error)
      ))
  }, [])

  useEffect(() => {
    api.getForum(forumId)
      .then((response) => {
        setForum(response.data)
      })
      .catch((error) => (
        setError(error)
      ))
  }, [forumId])

  useEffect(() => {
    api.getThread(threadId)
      .then((response) => {
        const searchSortItems = (type, searchString, searchType) => {
          const types = {
            createdAt: 'createdAt',
            content: 'content',
          }
          const searchTypes = {
            content: 'content',
            creator: 'creator',
          }
          const sortProperty = types[type]
          const searchProperty = searchTypes[searchType]
          const filtered = [...response.data.posts]
            .filter((thread) => {
              if (searchString === '') {
                return thread
              } else if (searchProperty === "creator") {
                if (thread[searchProperty]["displayName"].toLowerCase().includes(searchString.toLowerCase())) {
                  return thread
                }
              } else if (thread[searchProperty].toLowerCase().includes(searchString.toLowerCase())) {
                return thread
              }
            })
          const sorted = [...filtered]
            .sort((x, y) => y[sortProperty].localeCompare(x[sortProperty]))
          setPosts(sorted)
        }
        setThread(response.data)
        searchSortItems(sortType, searchString, searchType.searchType)
      })
      .catch((error) => (
        setError(error)
      ))
  }, [threadId, sortType, searchString, searchType.searchType])

  if (error) return `Error: ${error.message}`

  return (
    (user && forum && thread) &&
    <div className="relative min-h-screen bg-gray-100">
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <NavBar
        buttonContent="post"
        disableButton={thread.closed}
        user={user}
        component={<NewButton content='post' path={`/${forumId}/threads/${threadId}/posts/create`} />}
        searchString={searchString}
        setSearchString={setSearchString}
        searchTypes={searchTypes}
        searchType={searchType}
        setSearchType={setSearchType} />

      <Breadcrumb pages={[
        {
          name: forum.title,
          path: {
            pathname: `/${forumId}/threads`,
          }
        },
      ]} />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar user={user}/>
          </div>
          {thread &&
            <main className="lg:col-span-9 xl:col-span-10">
              <SectionHeadDrop
                title={thread.title}
                creator={thread.creator.username}
                date={moment().subtract(moment().diff(thread.created.slice(0, -5))).calendar()}
                open={!thread.closed}
                menu={
                  <ThreadOptions forumId={forumId} thread={thread} setThread={setThread} />
                }
              />

              <div className="px-4 sm:px-0">
                <div className="sm:hidden">
                  <label htmlFor="post-tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="post-tabs"
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
                <h1 className="sr-only">Posts</h1>
                <PostPaginator
                  data={posts}
                  component={PostList}
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