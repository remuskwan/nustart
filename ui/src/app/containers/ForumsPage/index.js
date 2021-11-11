import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'

import { getUser } from '../../util/Common'
// import AddForumModal from './addForum'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import ForumList from './forumList'

const tabs = [
    { name: 'Recent', href: '#', current: true },
    { name: 'Most Liked', href: '#', current: false },
    { name: 'Most Answers', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ForumsPage() {
    const [user, setUser] = useState(null)
    const [forums, setForums] = useState(null)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8080/NUStartApplication-war/webresources/users/${getUser()}`)
            .then(response => setUser(response.data))
            .catch((error) => (
                setError(error)
            ))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/NUStartApplication-war/webresources/forums")
            .then((response) =>
                setForums(response.data)
            )
            .catch((error) => (
                setError(error)
            ))
    }, [])

    if (error) return `Error: ${error.message}`

    return (
        <Fragment>
            {!user ? <div></div> : (
                <div className="relative min-h-screen bg-gray-100">
                    <NavBar
                        buttonContent="forum"
                        setOpen={setOpen}
                        component={
                            user.isAdmin &&
                            <button
                                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                onClick={() => setOpen(true)}
                            >
                                New Forum
                            </button>}
                    />
                    <AddForumModal
                        open={open}
                        setOpen={setOpen}
                        user={user}
                        forums={forums}
                        setForums={setForums}
                    />
                    <div className="py-10">
                        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                                <SideBar />
                            </div>
                            <main className="lg:col-span-9 xl:col-span-10">
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
                                    <h1 className="sr-only">Forums</h1>
                                    <ForumList
                                        items={forums}
                                        contentType="forums"
                                        path="/forumDetails"
                                        setForums={setForums} />
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}