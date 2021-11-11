import { useEffect, useState } from 'react'

import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import api from '../../util/api'
import CategoriesTable from '../../components/categoriesTable'
import NewButton from '../../components/newButton'
import { useRouteMatch } from 'react-router'

const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
]
const searchTypes = [
  { id: 1, name: 'Name', searchType: 'name' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CategoriesPage() {
  const { url } = useRouteMatch()
  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(true)
  const [error, setError] = useState(null)
  const [sortType, setSortType] = useState('created')
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
        const searchSortItems = (type, searchString, searchType) => {
          const types = {
            created: 'created',
            name: 'name',
          }
          const searchTypes = {
            name: 'name',
          }
          const sortProperty = types[type]
          const searchProperty = searchTypes[searchType]
          const filtered = [...response.data]
            .filter((user) => {
              if (searchString === '') {
                return user
              } else if (user[searchProperty].toLowerCase().includes(searchString.toLowerCase())) {
                return user
              }
            })
          const sorted = [...filtered]
            .sort((x, y) => y[sortProperty].localeCompare(x[sortProperty]))
          setCategories(sorted)
        }
        searchSortItems(sortType, searchString, searchType.searchType)
      })
      .catch((error) => (
        setError(error)
      ))
  }, [sortType, searchString, searchType.searchType])

  if (error) return `Error: ${error.message}`

  return (
    user &&
      <div className="relative min-h-screen bg-gray-100">
        <NavBar
          buttonContent="forum"
          disableButton={user.accountType !== "ADMIN"}
          component={
            <NewButton content='category' path={`${url}/create`} />
          }
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
              <div className="mt-4">
                <h1 className="sr-only">Categories</h1>
                <CategoriesTable items={categories} dataLimit={10} />
              </div>
            </main>
          </div>
        </div>
      </div>
  )
}