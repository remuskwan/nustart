import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import {
    ChevronRightIcon,
    CheckIcon,
    SelectorIcon,
    StarIcon,
    UserCircleIcon,
    MailIcon,
    PhoneIcon,
    BanIcon,
} from '@heroicons/react/solid'
import {
    CalendarIcon,
    HomeIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    AnnotationIcon,
    LibraryIcon,
    CheckCircleIcon,
} from '@heroicons/react/outline'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'

import NewButton from '../../components/newButton'
import api from '../../util/api'
import { useHistory, useParams } from 'react-router'
import GuidesTab from './guidesTab'
import ContactsTab from './contactsTab'

import AccountTab from './accountTab';
import ThreadsTab from './threadsTab'
import PostsTab from './postsTab'
import PasswordTab from './passwordTab'

const tabs = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Password', href: '#', current: false },
    { name: 'Contacts', href: '#', current: false },
    { name: 'Guides', href: '#', current: false },
    { name: 'Threads', href: '#', current: false },
    { name: 'Posts', href: '#', current: false },
    //{ name: 'Liked', href: '#', current: false },
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

const posts = [
    {
        creator: {
            forumTitle: 'Forum Title',
            threadTitle: 'Title',
            name: 'Ricardo Cooper',
            email: 'ricardo.cooper@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: 'December 9 at 11:43 AM',
        postContents: 'POST CONTENTS',
        stage: 'Completed phone screening',
        href: '#',
    },
    {
        creator: {
            forumTitle: 'Forum Title 2',
            threadTitle: 'Title 2',
            name: 'Ricardo Cooper',
            email: 'ricardo.cooper@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: 'December 30 at 11:43 AM',
        postContents: 'POST CONTENTS 2',
        stage: 'Completed phone screening',
        href: '#',
    },
]

const threads = [
    {
        id: 1,
        forum: {
            id: 1,
            forumTitle: 'forum title',
        },
        title: 'thread title',
        date: 'March 30 at 11:43 AM',
        posts: 20,
    },
]

const likedFilter = [
    { id: 1, name: 'Guides' },
    { id: 2, name: 'Posts' },
]

const likes = [
    {
        id: 1, type: 'Guide',
        value: {
            id: 1,
            title: 'guide title',
            contents: 'guide contents'
        },
    },
    {
        id: 2, type: 'Post',
        value: {
            id: 1,
            title: 'post title',
            contents: 'Whether you are working on a new cutting edge app or simply ramping up on new technology, Java documentation has all the information you need to make your project a smashing success. Use the rich set of code samples, tutorials, developer guides, API documentation, and more to quickly develop your prototype and scale it up to a real world application.',
        },
    },
    {
        id: 3, type: 'Guide',
        value: {
            id: 2,
            title: 'guide title 2',
            contents: 'guide contents 2'
        },
    },
]

const years = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: 'Part-time' },
    { id: 7, name: 'Graduate' },
    { id: 8, name: 'PhD' },
]

const faculties = [
    { id: 1, name: 'Arts & Social Sciences' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'Computing' },
    { id: 4, name: 'Continuing and Lifelong Education' },
    { id: 5, name: 'Dentistry' },
    { id: 6, name: 'Design & Environment' },
    { id: 7, name: 'Duke-NUS' },
    { id: 8, name: 'Engineering' },
    { id: 9, name: 'Integrative Sciences & Engineering' },
    { id: 10, name: 'Law' },
    { id: 11, name: 'Medicine' },
    { id: 12, name: 'Music' },
    { id: 13, name: 'Public Health' },
    { id: 14, name: 'Public Policy' },
    { id: 15, name: 'Science' },
    { id: 16, name: 'University Scholars Program' },
    { id: 17, name: 'Yale-NUS' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {

    const [user, setUser] = useState(defaultUser) //logged in user
    const [viewUser, setViewUser] = useState(defaultUser) //viewing other user
    const [tab, setTab] = useState(tabs[0])

    const [profilePic, setProfilePic] = useState('')
    const [selected, setSelected] = useState(likedFilter[0])

    const [guides, setGuides] = useState([])
    const [threads, setThreads] = useState([])
    const [posts, setPosts] = useState([])
    const [editMode, setEditMode] = useState(false)

    const { uid } = useParams()

    useEffect(() => {
        async function getLogged() {
            await api.getUser()
                .then(response => {
                    setUser(response.data)
                    setProfilePic(response.data.profilePicture)
                    setEditMode(response.data.id.toString() === uid)
                    //console.log(response.data.id === uid)
                }).then(async () => {
                    if (!editMode) {
                        await api.getUser(uid)
                            .then(response => setViewUser(response.data))
                    }
                })
        }
        getLogged()
    }, [])

    useEffect(() => {
        async function getGuides() {
            await api.getUserGuide(uid)
                .then(response => {
                    setGuides(response.data)
                })
                .then(() => console.log(guides))
        }
        getGuides()
    }, [])

    useEffect(() => {
        async function getThreads() {
            await api.getUserThread(uid)
                .then(response => {
                    setThreads(response.data)
                })
                .then(() => console.log(threads))
        }
        getThreads()
    }, [])

    useEffect(() => {
        async function getPosts() {
            await api.getUserPost(uid)
            //.then(response => console.log(response.data))
            .then(response => setPosts(response.data))
        }
        getPosts()
    }, [])

    function resetTabState(tabName) {
        tabs.filter((t) => t.current === true).map((t) => t.current = false)
        const currentTab = tabs.filter((t) => t.name === tabName).map((t) => t.current = true)
        setTab(currentTab)
    }

    function CurrentTab() {
        const activeTab = tabs.filter((t) => t.current === true)
        if (activeTab[0].name === 'Profile') {
            return <AccountTab editMode={editMode} uid={uid} />;
        } else if (activeTab[0].name === 'Contacts') {
            return <ContactsTab editMode={editMode} user={user} />;
        } else if (activeTab[0].name === 'Guides') {
            return <GuidesTab guides={guides} />;
        } else if (activeTab[0].name === 'Posts') {
            return <PostsTab posts={posts} />;
        } else if (activeTab[0].name === 'Threads') {
            return <ThreadsTab threads={threads} />
        } else {
            return <PasswordTab user={user} />
        }
    }

    // function LikedTab(editMode) {
    //     return (
    //         <div>
    //             <Listbox value={selected} onChange={setSelected}>
    //                 <div className="p-5 mt-1 relative">
    //                     <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
    //                         <span className="block truncate">{selected.name}</span>
    //                         <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
    //                             <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    //                         </span>
    //                     </Listbox.Button>

    //                     <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
    //                         <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
    //                             {likedFilter.map((filter) => (
    //                                 <Listbox.Option
    //                                     key={filter.id}
    //                                     className={({ active }) =>
    //                                         classNames(
    //                                             active ? 'text-white bg-rose-600' : 'text-gray-900',
    //                                             'cursor-default select-none relative py-2 pl-8 pr-4'
    //                                         )
    //                                     }
    //                                     value={filter}
    //                                 >
    //                                     {({ selected, active }) => (
    //                                         <>
    //                                             <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
    //                                                 {filter.name}
    //                                             </span>
    //                                             {selected ? (
    //                                                 <span
    //                                                     className={classNames(
    //                                                         active ? 'text-white' : 'text-rose-600',
    //                                                         'absolute inset-y-0 left-0 flex items-center pl-1.5'
    //                                                     )}
    //                                                 >
    //                                                     <CheckIcon className="h-5 w-5" aria-hidden="true" />
    //                                                 </span>
    //                                             ) : null}
    //                                         </>
    //                                     )}
    //                                 </Listbox.Option>
    //                             ))}
    //                         </Listbox.Options>
    //                     </Transition>
    //                 </div>
    //             </Listbox>
    //             <FilterFavourites />
    //         </div>
    //     )
    // }

    function FilterFavourites() {
        let filtered = [];
        if (selected.name === 'Guides') {
            filtered = likes.filter((f) => f.type === 'Guide')
        } else {
            filtered = likes.filter((f) => f.type === 'Post')
        }
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {filtered.map((f) => (
                        <li key={f.id}>
                            <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                        <div className="flex text-sm">
                                            <p className="font-medium text-rose-600 truncate">{f.value.title}</p>
                                        </div>
                                        <div className="mt-2 flex">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-6">
                                                    {f.value.contents}
                                                </dd>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                                        {editMode
                                            ? <a href="#" className="block hover:bg-gray-50">
                                                <StarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </a>
                                            : null
                                        }
                                    </div>
                                </div>
                                <div className="ml-5 flex-shrink-0">
                                    <a href="#" className="block hover:bg-gray-50">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    function RenderPosition() {
        if (viewUser.accountType === 'STAFF') {
            return (
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Staff
                    </div>

                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <LibraryIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {viewUser.faculty}
                    </div>
                </div>
            )
        } else if (viewUser.accountType === 'ADMIN') {
            return (
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">

                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <UserCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Administrator
                    </div>

                </div>
            )

        } else {
            return (
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <AcademicCapIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Student
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <LibraryIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {viewUser.faculty}
                    </div>
                </div>
            )
        }



    }

    function RenderTabs() {
        if (!editMode) {
            let finalTabs = []
            const newTabs = tabs.filter((t) => t.name !== 'Password')
            if (viewUser.accountType === 'STUDENT') {
                finalTabs = newTabs.filter((t) => t.name !== 'Guides')
            } else {
                finalTabs = newTabs
            }
            return (
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {finalTabs.map((tab) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                tab.current
                                    ? 'border-pink-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                            onClick={() => {
                                resetTabState(tab.name)
                            }}
                        >
                            {tab.name}
                        </a>
                    ))}
                </nav>
            )
        } else {
            if (user.accountType === 'STUDENT') {
                const newTabs = tabs.filter((t) => t.name !== 'Guides')
                return (
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {newTabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? 'border-pink-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                                onClick={() => {
                                    resetTabState(tab.name)
                                }}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                )
            } else {
                return (
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? 'border-pink-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                                onClick={() => {
                                    resetTabState(tab.name)
                                }}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                )
            }
        }
    }

    function EditMode() {
        return (
            <main className="lg:col-span-9 xl:col-span-9 bg-white rounded-md">
                <article>
                    <div>
                        <div className="h-18 w-full object-cover lg:h-28 xl:h-40 rounded-md">
                            <img className="h-32 w-full object-cover lg:h-48 xl:h-56 rounded-md" src={user.coverImage} alt="" />
                        </div>
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                <div className="flex">
                                    {profilePic === "default"
                                        ?
                                        <div class="max-w-md mx-auto my-3">
                                            <div class="flex justify-center items-center content-center bg-gradient-to-br from-pink-300 to-pink-600 shadow-md hover:shadow-lg h-24 w-24 rounded-full fill-current text-white">
                                                <h2 style={{ fontSize: 24 }}>{user.username.substring(0, 1)}</h2>
                                            </div>
                                        </div>
                                        :
                                        <img
                                            className="h-24 w-24 rounded-full sm:h-32 sm:w-32"
                                            src={profilePic}
                                            alt={user.username.substring(0, 1)}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="p-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{viewUser.username}</h2>
                                <RenderPosition />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-2 2xl:mt-5">
                        <div className="border-b border-gray-200">
                            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                <RenderTabs />
                            </div>
                        </div>
                    </div>
                    <CurrentTab />
                </article>
            </main>
        )
    }

    function ViewMode() {
        return (
            viewUser &&
            <main className="lg:col-span-9 xl:col-span-9 bg-white rounded-md">
                <article>
                    <div>
                        <div>
                            <img className="h-32 w-full object-cover lg:h-48" src={viewUser.coverImage} alt="" />
                        </div>

                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                <div className="flex">
                                    {viewUser.profilePicture === "default"
                                        ?
                                        <div class="max-w-md mx-auto my-3">
                                            <div class="flex justify-center items-center content-center bg-gradient-to-br from-pink-300 to-pink-600 shadow-md hover:shadow-lg h-24 w-24 rounded-full fill-current text-white">
                                                <h2 style={{ fontSize: 24 }}>{viewUser.username.substring(0, 1)}</h2>
                                            </div>
                                        </div>
                                        :
                                        <img
                                            className="h-24 w-24 rounded-full sm:h-32 sm:w-32"
                                            src={viewUser.profilePicture}
                                            alt={viewUser.username.substring(0, 1)}
                                        />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="p-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{viewUser.username}</h2>
                                    <RenderPosition />
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        {
                                            viewUser.accountStatus === 'ACTIVE'
                                                ? 
                                                <>
                                                    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                    {viewUser.accountStatus}
                                                </>
                                                : null
                                        }
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="mt-6 sm:mt-2 2xl:mt-5">
                        <div className="border-b border-gray-200">
                            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                <RenderTabs />
                            </div>
                        </div>
                    </div>
                    <CurrentTab />
                </article>
            </main>
        )
    }

    return (
        <div className="relative min-h-screen bg-gray-100">
            <NavBar
                disableButton={true}
                disableSearch={true}
                user={user}
            />
            <div className="py-10">
                <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <SideBar user={user} />
                    </div>
                    {editMode ? <EditMode /> : <ViewMode />}
                </div>
            </div>
        </div>
    )
}