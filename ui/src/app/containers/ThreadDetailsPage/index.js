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
import SortSelectMenu from '../../components/SelectMenus/sortSelectMenu'

const sortTypes = [
  { id: 1, name: 'Recent', sortType: 'createdAt', reverse: false },
  { id: 2, name: 'Content', sortType: 'content', reverse: true },
]

const searchTypes = [
  { id: 1, name: 'Content', searchType: 'content' },
  { id: 2, name: 'Creator', searchType: 'creator' },
]

export default function ThreadDetailsPage() {
  const { forumId, threadId } = useParams()
  const [user, setUser] = useState(null)
  const [forum, setForum] = useState(null)
  const [thread, setThread] = useState(null)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [searchString, setSearchString] = useState("")
  const [searchType, setSearchType] = useState(searchTypes[0])
  const [sortType, setSortType] = useState(sortTypes[0])

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
            creator: 'creator',
            content: 'content',
          }
          const sortProperty = types[type]
          const searchProperty = searchTypes[searchType]
          const filtered = [...response.data.posts]
            .filter((post) => {
              if (searchString === '') {
                return post
              } else if (searchProperty === "creator") {
                if (post[searchProperty]["username"].toLowerCase().includes(searchString.toLowerCase())) {
                  return post
                }
              } else if (post[searchProperty].replace(/(<([^>]+)>)/ig, '').toLowerCase().includes(searchString.toLowerCase())) {
                return post
              }
            })
          const sorted = [...filtered]
            .sort((x, y) => y[sortProperty].localeCompare(x[sortProperty]))
          setPosts(sorted)
        }
        setThread(response.data)
        searchSortItems(sortType.sortType, searchString, searchType.searchType)
      })
      .catch((error) => (
        setError(error)
      ))
  }, [threadId, sortType.sortType, searchString, searchType.searchType])

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
            <SideBar user={user} />
          </div>
          {thread &&
            <main className="lg:col-span-9 xl:col-span-10">
              <SectionHeadDrop
                title={thread.title}
                creator={thread.creator.username}
                date={moment().subtract(moment().diff(thread.created.slice(0, -5))).calendar()}
                open={!thread.closed}
                disableMenu={thread.creator.id !== user.id && user.accountType !== 'ADMIN'}
                menu={
                  <ThreadOptions user={user} forumId={forumId} thread={thread} setThread={setThread} />
                }
              />
              <div className="mt-5">
              <SortSelectMenu options={sortTypes} sortType={sortType} setSortType={setSortType} />
              </div>
              <div className="mt-4">
                <h1 className="sr-only">Posts</h1>
                <PostPaginator
                  data={posts}
                  component={PostList}
                  dataLimit={10}
                  forumId={forumId}
                  threadId={threadId}
                  setThread={setThread}
                  setPosts={setPosts}
                  contentType="posts"
                  user={user}
                />
              </div>
            </main>
          }
        </div>
      </div>
    </div>
  )
}