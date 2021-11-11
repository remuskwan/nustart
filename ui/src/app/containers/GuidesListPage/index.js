import { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router'

import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import NewButton from '../../components/newButton'
import GuideList from '../../components/Guides/guideList'
import api from '../../util/api'
import GuideCategories from '../../components/guideCategories'
import PostPaginator from '../../components/Paginator/postPaginator'

const tabs = [//need to change to category
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

export default function GuidesListPage() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [guides, setGuides] = useState([])
  const [category, setCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [searchString, setSearchString] = useState("")
  const [searchType, setSearchType] = useState(searchTypes[0])
  const [sortType, setSortType] = useState('dateCreated')

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => (
        setError(error)
      ))
  }, [])

  useEffect(() => {
    api.getCategories()
      .then((response) => {
        setCategories(response.data)
        // console.log(response.data.forEach((cat) => console.log(cat.id)))
        setSelected(response.data.find((cat) => cat.id == id))
      })
      .catch((error) => (
        setError(error)
      ))
  }, [id])

  useEffect(() => {
    api.getCategory(id)
      .then((response) => {
        const searchSortItems = (type, searchString, searchType) => {
          const types = {
            dateCreated: 'dateCreated',
            title: 'title',
            content: 'content',
          }
          const searchTypes = {
            content: 'content',
            creator: 'creator',
          }
          const sortProperty = types[type]
          const searchProperty = searchTypes[searchType]
          const filtered = [...response.data.guides]
            .filter((category) => {
              if (searchString === '') {
                return category
              } else if (searchProperty === "creator") {
                if (category[searchProperty]["displayName"].toLowerCase().includes(searchString.toLowerCase())) {
                  return category
                }
              } else if (category[searchProperty].toLowerCase().includes(searchString.toLowerCase())) {
                return category
              }
            })
          const sorted = [...filtered]
            .sort((x, y) => y[sortProperty].localeCompare(x[sortProperty]))
          setGuides(sorted)
        }
        setCategory(response.data)
        searchSortItems(sortType, searchString, searchType.searchType)
      })
      .catch((error) => (
        setError(error)
      ))
  }, [id,sortType, searchString, searchType.searchType])

  if (error) return `Error: ${error.message}`

  return (
    (user && category) &&
    <div className="relative min-h-screen bg-gray-100">
      <NavBar
        buttonContent="guide"
        disableButton={user.accountType === "STUDENT"}
        component={<NewButton content='guide' path="/createGuide" />}
        user={user}
        searchString={searchString}
        setSearchString={setSearchString}
        searchTypes={searchTypes}
        searchType={searchType}
        setSearchType={setSearchType} 
      />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar user={user} />
          </div>
          <main className="lg:col-span-9 xl:col-span-10">
            <div className="px-4 sm:px-0">
              {(categories.length && selected) &&
                <GuideCategories categories={categories} selected={selected} setSelected={setSelected} />
              }
              {/* <div className="sm:hidden">
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
              </div> */}
            </div>
            <div className="mt-4">
              <h1 className="sr-only">Guides</h1>
              <PostPaginator
                // items={guides}
                // contentType="guides"
                // setGuides={setGuides}
                // user={user}
                data={guides}
                component={GuideList}
                dataLimit={3}
                // forumId={forumId}
                // threadId={threadId}
                setGuides={setGuides}
                contentType="guides"
                user={user}
              />
            </div>
          </main>
        </div>
      </div>
    </div>

  )
}