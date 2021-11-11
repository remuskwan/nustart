import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import NewButton from '../../components/newButton'
import GuideList from '../../components/Guides/guideList'
import api from '../../util/api'
import GuideCategories from '../../components/guideCategories'
import PostPaginator from '../../components/Paginator/postPaginator'
import SortSelectMenu from '../../components/SelectMenus/sortSelectMenu'

const sortTypes = [
  { id: 1, name: 'Recent', sortType: 'dateCreated', reverse: false },
  { id: 2, name: 'Title', sortType: 'title', reverse: true },
]
const searchTypes = [
  { id: 1, name: 'Title', searchType: 'title' },
  { id: 2, name: 'Creator', searchType: 'creator' },
]

export default function GuidesListPage() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [guides, setGuides] = useState([])
  const [category, setCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [sortType, setSortType] = useState(sortTypes[0])
  const [searchString, setSearchString] = useState("")
  const [searchType, setSearchType] = useState(searchTypes[0])

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
        setSelected(response.data.find((cat) => cat.id == id))
      })
      .catch((error) => (
        setError(error)
      ))
  }, [id, sortType, searchString, searchType.searchType])

  useEffect(() => {
    api.getCategory(id)
      .then((response) => {
        const sortItems = (type, searchString, searchType) => {
          const types = {
            dateCreated: 'dateCreated',
            title: 'title',
          }
          const searchTypes = {
            title: 'title',
            creator: 'creator',
          }
          const sortProperty = types[type]
          const searchProperty = searchTypes[searchType]
          const filtered = [...response.data.guides]
            .filter((guide) => {
              if (searchString === '') {
                return guide
              } else if (searchProperty === "creator") {
                if (guide[searchProperty]["username"].toLowerCase().includes(searchString.toLowerCase())) {
                  return guide
                }
              } else if (guide[searchProperty].replace(/(<([^>]+)>)/ig, '').toLowerCase().includes(searchString.toLowerCase())) {
                return guide
              }
            })
          const sorted = [...filtered]
            .sort((x, y) => y[sortProperty].localeCompare(x[sortProperty])
              || y['dateCreated'].localeCompare(x['dateCreated']))
          setGuides(sorted)
        }
        sortItems(sortType.sortType, searchString, searchType.searchType)
        setCategory(response.data)
      })
      .catch((error) => (
        setError(error)
      ))
  }, [id, sortType.sortType, searchString, searchType.searchType])

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
            <div className="px-4 sm:px-0 flex">
              {(categories.length && selected) &&
                <>
                  <div className="mr-20 flex-1">
                    <GuideCategories categories={categories} selected={selected} setSelected={setSelected} />
                  </div>
                  <div className="flex-1">
                    <SortSelectMenu options={sortTypes} sortType={sortType} setSortType={setSortType} />
                  </div>
                </>
              }
            </div>
            <div className="mt-4">
              <h1 className="sr-only">Guides</h1>
              <PostPaginator
                data={guides}
                component={GuideList}
                dataLimit={10}
                setGuides={setGuides}
                user={user}
              />
            </div>
          </main>
        </div>
      </div>
    </div>

  )
}