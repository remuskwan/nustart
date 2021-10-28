import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import { useParams } from 'react-router'
import PostList from './postList'
import SectionHeadDrop from '../../components/sectionHeadDrop'
import Breadcrumb from '../../components/breadcrumb'
import ThreadOptions from './threadOptions'

const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ThreadDetailsPage() {
  const { forumId, threadId } = useParams()
  const [forum, setForum] = useState(null)
  const [thread, setThread] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8080/IS3106Assignment1-war/webresources/forums/${forumId}`)
      .then((response) => {
        setForum(response.data)
      }
      )
      .catch((error) => (
        setError(error)
      ))
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/IS3106Assignment1-war/webresources/threads/${threadId}`)
      .then((response) => {
        setThread(response.data)
      }
      )
      .catch((error) => (
        setError(error)
      ))
  }, [])

  if (error) return `Error: ${error.message}`

  return (
    <div>
      {(forum && thread) &&
        <div className="relative min-h-screen bg-gray-100">
          {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
          <NavBar buttonContent="post" disableButton={thread.closed} component={
            <Link
              to={{
                pathname: "/addPost",
                state: {
                  forum: forum,
                  thread: thread
                }
              }}>
              <button
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                New Post
              </button>
            </Link>
          } />
          <div className="py-10">
            <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                <SideBar />
              </div>
              {thread &&
                <main className="lg:col-span-9 xl:col-span-10">
                  <Breadcrumb pages={[
                    {
                      name: forum.title,
                      path: {
                        pathname: `/${forum.id}/threads`,
                      }
                    },

                  ]} />
                  <SectionHeadDrop
                    title={thread.title}
                    date={moment().subtract(moment().diff(thread.createdAt.slice(0, -5))).calendar()}
                    open={!thread.closed}
                    menu={
                      <ThreadOptions forum={forum} thread={thread} setThread={setThread} />
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
                    <PostList
                      items={thread.posts}
                      forum = {forum}
                      thread = {thread}
                      setThread={setThread}
                      contentType="posts"
                    />
                  </div>
                </main>
              }
            </div>
          </div>
        </div>}
    </div>

  )
}