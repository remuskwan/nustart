import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {
    ChevronRightIcon,
    CheckIcon,
    SelectorIcon,
    StarIcon,
    FilterIcon,
} from '@heroicons/react/solid'
import {
    CalendarIcon,
    HomeIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    AnnotationIcon,
    LibraryIcon,
    SearchIcon,
} from '@heroicons/react/outline'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import ContactForm from '../../components/contacts/ContactForm'
import ContactList from '../../components/contacts/ContactList'
import NewButton from '../../components/newButton'
import api from '../../util/api'

const tabs = [
    { name: 'All Users', href: '#', current: true },
    { name: 'To Approve', href: '#', current: false },
    { name: 'Staff', href: '#', current: false },
    { name: 'Students', href: '#', current: false },
]

const defaultUser = {
    "accountStatus": "ACTIVE",
    "accountType": "ADMIN",
    "contacts": [],
    "created": "2021-11-03T16:00:00Z[UTC]",
    "deleted": false,
    "email": "admin01@mail.com",
    "favoriteGuides": [],
    "favoritePosts": [],
    "id": 1,
    "password": "asdf",
    "username": "Admin01",
    "yr": 0
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UsersPage() {
    const [tab, setTab] = useState(tabs[0])
    const [user, setUser] = useState(defaultUser)
    const [error, setError] = useState(null)
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        api.getUser()
            .then(response => setUser(response.data))
            .catch((error) => (
                setError(error)
            ))
    }, [])

    useEffect(() => {
        api.getUsers()
            .then(response => setAllUsers(response.data))
            .catch((error) => (
                setError(error)
            ))
    }, [])

    function resetTabState(tabName) {
        tabs.filter((t) => t.current === true).map((t) => t.current = false)
        const currentTab = tabs.filter((t) => t.name === tabName).map((t) => t.current = true)
        setTab(currentTab)
    }

    function CurrentTab() {
        const activeTab = tabs.filter((t) => t.current === true)
        if (activeTab[0].name === 'All Users') {
            return <AllUsersTab />
        } else if (activeTab[0].name === 'To Approve') {
            console.log('guides')
            return null
        } else if (activeTab[0].name === 'Staff') {
            console.log('posts')
            return null
        } else if (activeTab[0].name === 'Students') {
            return null
        } else {
            return null
        }
    }

    function AllUsersTab() {
        return (
            <div>
                <div className="px-6 pt-6 pb-4">
                    <p className="mt-1 text-sm text-gray-600">Search directory of {allUsers.length} users</p>
                    <form className="mt-6 flex space-x-4" action="#">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Search"
                                />
                            </div>
                        </div>

                    </form>
                </div>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul role="list" className="divide-y divide-gray-200">
                        {allUsers.map((user) => (
                            <li key={user.id}>
                                <a href="#" className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 flex items-center sm:px-6">
                                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div className="truncate">
                                                <div className="flex text-sm items-center">
                                                    <p className="text-xl font-medium text-rose-500 truncate">{user.email}</p>
                                                    <p className="ml-3 flex-shrink-0 font-normal text-gray-500">{user.accountType}</p>
                                                </div>
                                                <div className="mt-2 flex">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <p>
                                                            Created on <time dateTime={user.datePublished}>{user.datePublished}</time>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                                                <div className="flex overflow-hidden -space-x-1">

                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-5 flex-shrink-0">
                                            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-gray-100">
            <NavBar
                buttonContent="users"
                disableButton={user.accountType !== "ADMIN"}
                component={<NewButton content='users' path='/create' />}
                user={user}
            />
            <div className="py-10">
                <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <SideBar user={user} />
                    </div>
                    <main className="lg:col-span-9 xl:col-span-9 bg-white">
                        <article>
                            {/* Profile header */}
                            <div>

                                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">

                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="p-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{user.name}</h2>
                                        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">

                                            <div className="mt-2 flex items-center text-sm text-gray-500">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="sm:hidden">
                                    <label htmlFor="tabs" className="sr-only">
                                        Select a tab
                                    </label>
                                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                                    <select
                                        id="tabs"
                                        name="tabs"
                                        className="mb-5 block w-full focus:ring-rose-500 focus:border-rose-500 border-gray-300 rounded-md"
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
                                                className={classNames(
                                                    tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                                    tabIdx === 0 ? 'rounded-l-lg' : '',
                                                    tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                                                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                                )}
                                                aria-current={tab.current ? 'page' : undefined}
                                                onClick={() => {
                                                    resetTabState(tab.name)
                                                }}
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

                            <CurrentTab />
                        </article>
                    </main>
                </div>
            </div>
        </div>
    )

}