import { useState, useEffect } from 'react'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import NewButton from '../../components/newButton'
import api from '../../util/api'
import AllUsersTab from './allUsersTab'
import BlockTab from './BlockTab'
import ApproveTab from './ApproveTab'

const tabs = [
    { name: 'All Users', href: '#', current: true },
    { name: 'To Approve', href: '#', current: false },
    { name: 'Block', href: '#', current: false },
]

const searchTypes = [
    { id: 1, name: 'Name', searchType: 'username' },
    { id: 2, name: 'Email', searchType: 'email' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UsersPage() {
    const [tab, setTab] = useState(tabs[0])
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [searchString, setSearchString] = useState("")
    const [searchType, setSearchType] = useState(searchTypes[0])

    useEffect(() => {
        api.getUser()
            .then(response => {
                setUser(response.data)
            })
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
            return <AllUsersTab searchString={searchString} searchType={searchType}/>
        } else if (activeTab[0].name === 'To Approve') {
            return <ApproveTab searchString={searchString} searchType={searchType}/>
        } else if (activeTab[0].name === 'Block') {
            return <BlockTab user={user} searchString={searchString} searchType={searchType} />
        } else {
            return null
        }
    }

    return (
        user &&
        <div className="relative min-h-screen bg-gray-100">
            <NavBar
                buttonContent="users"
                disableButton={user.accountType !== "ADMIN"}
                component={<NewButton content='admin' path='/users/create' />}
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
                    <main className="lg:col-span-9 xl:col-span-9">
                        <>
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
                                            <button
                                                key={tab.name}
                                                // href={tab.href}
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
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                            <CurrentTab />
                        </>
                    </main>
                </div>
            </div>
        </div>
    )

}