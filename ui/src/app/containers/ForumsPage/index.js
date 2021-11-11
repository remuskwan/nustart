import { useEffect, useState } from 'react'

import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import NewButton from '../../components/newButton'
import ForumList from './forumList'
import api from '../../util/api'
import SortSelectMenu from '../../components/SelectMenus/sortSelectMenu'

const sortTypes = [
    { id: 1, name: 'Recent', sortType: 'createdAt', reverse: false },
    { id: 2, name: 'Title', sortType: 'title', reverse: true },
]

const searchTypes = [
    { id: 1, name: 'Title', searchType: 'title' },
    { id: 2, name: 'Creator', searchType: 'creator'},
]

export default function ForumsPage() {
    const [user, setUser] = useState(null)
    const [forums, setForums] = useState([])
    const [error, setError] = useState(null)
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
        api.getForums()
            .then((response) => {
                const sortItems = (type, searchString, searchType) => {
                    const types = {
                        created: 'created',
                        title: 'title',
                    }
                    const searchTypes = {
                        title: 'title',
                        creator: 'creator',
                    }
                    const sortProperty = types[type]
                    const searchProperty = searchTypes[searchType]
                    const filtered = [...response.data]
                        .filter((forum) => {
                            if (searchString === '') {
                                return forum
                            } else if (searchProperty === "creator") {
                                if (forum[searchProperty]["username"].toLowerCase().includes(searchString.toLowerCase())) {
                                    return forum
                                }
                            } else if (forum[searchProperty].toLowerCase().includes(searchString.toLowerCase())) {
                                return forum
                            }
                        })
                    const sorted = [...filtered]
                        .sort((x, y) => y[sortProperty].localeCompare(x[sortProperty])
                            || y['created'].localeCompare(x['created']))
                    setForums(sorted)
                }
                sortItems(sortType.sortType, searchString, searchType.searchType)
            }
            )
            .catch((error) => (
                setError(error)
            ))
    }, [sortType.sortType, searchString, searchType.searchType])

    if (error) return `Error: ${error.message}`

    return (
        user &&
        <div className="relative min-h-screen bg-gray-100">
            <NavBar
                buttonContent="forum"
                disableButton={user.accountType !== "ADMIN"}
                component={<NewButton content='forum' path='/create'/>}
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
                        <SideBar user={user}/>
                    </div>
                    <main className="lg:col-span-9 xl:col-span-10">
                        <SortSelectMenu options={sortTypes} sortType={sortType} setSortType={setSortType} />
                        <div className="mt-4">
                            <h1 className="sr-only">Forums</h1>
                            <ForumList
                                items={forums}
                                contentType="forums"
                                path="/forumDetails"
                                setForums={setForums}
                                user={user}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </div>

    )
}