import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {
    ChevronRightIcon,
    CheckIcon,
    SelectorIcon,
    StarIcon,
} from '@heroicons/react/solid'
import {
    CalendarIcon,
    HomeIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    AnnotationIcon,
    LibraryIcon,
} from '@heroicons/react/outline'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import ContactForm from '../../components/contacts/ContactForm'
import ContactList from '../../components/contacts/ContactList'
import NewButton from '../../components/newButton'
import api from '../../util/api'

const tabs = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Guides', href: '#', current: false },
    { name: 'Threads', href: '#', current: false },
    { name: 'Posts', href: '#', current: false },
    { name: 'Favourites', href: '#', current: false },
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

const guides = [
    { id: '1', title: 'Guide Title', creator: defaultUser, datePublished: 'December 9 at 11:43 AM', dateEdited: 'December 12 at 11:43 AM' }
]

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

const favouriteFilter = [
    { id: 1, name: 'Guides' },
    { id: 2, name: 'Posts' },
]

const favourites = [
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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {
    //const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState(defaultUser)
    const [tab, setTab] = useState(tabs[0])
    const [contactStore, setNotesStore] = useState({ contacts: user.contacts, currentId: 0 })
    const [selected, setSelected] = useState(favouriteFilter[0])
    const [error, setError] = useState(null)

    useEffect(() => {
        api.getUser()
            .then(response => setUser(response.data))
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
        if (activeTab[0].name === 'Profile') {
            return <ProfileTab />;
        } else if (activeTab[0].name === 'Guides') {
            console.log('guides')
            return <GuidesTab />;
        } else if (activeTab[0].name === 'Posts') {
            console.log('posts')
            return <PostsTab />;
        } else if (activeTab[0].name === 'Threads') {
            return <ThreadsTab />;
        } else {
            return <FavouriteTab />;
        }
    }

    function handleDelete(id) {
        const { contacts } = contactStore;
        const updatedNotes = contacts.filter((n) => {
            return n.id !== id;
        });

        setNotesStore((oldNotesStore) => ({
            currentId: oldNotesStore.currentId,
            contacts: updatedNotes,
        }));

        console.log("###updatedNotes: ", updatedNotes);
    } //end handleDelete

    function handleAddEdit(note) {
        console.log("###in handleAddEdit ", note);
        const { currentId, contacts } = contactStore;
        if (note.id === 0) {
            //add action
            if (note.value.trim() === "") return;

            note.id = currentId + 1;

            setNotesStore({
                currentId: note.id,
                contacts: [...contacts, note],
            });
        } else {
            //edit action
            if (note.value.trim() === "") {
                //cancel edit
                return;
            } else {
                //find the note
                const updatedNotes = contacts.map((n) => {
                    if (n.id === note.id) {
                        note.editMode = false;
                        return note;
                    } else {
                        return n;
                    }
                });

                setNotesStore((oldContactsStore) => ({
                    currentId: oldContactsStore.currentId,
                    contacts: updatedNotes,
                }));
            }
        }
    }

    const { contacts } = contactStore;

    function ProfileTab() {
        return (
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form className="space-y-6 p-4" action="#" method="PUT">
                    <div>
                        <div className="mt-3 grid grid-cols-4 gap-6">
                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="cc-given-name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-rose-600 focus:border-rose-600 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="cc-family-name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-rose-600 focus:border-rose-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            <div className="mt-3 col-span-6 sm:col-span-2">
                                <label htmlFor="user-email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="user-email"
                                        id="user-email"
                                        className="focus:ring-rose-500 focus:border-rose-500 flex-1 block w-full rounded-l-md sm:text-sm border-gray-300"
                                        value={user.email.replace("@u.nus.edu", "")}
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        @u.nus.edu
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                About
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    defaultValue={''}
                                    contentEditable='true'
                                    value={user.about}
                                />
                            </div>
                        </div>
                        <div className="mt-3 sm:col-span-6">
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                Photo
                            </label>
                            <div className="mt-1 flex items-center">
                                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                <div className="p-3 flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-grey-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                    >
                                        <span>Change</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <button
                                        type="button"
                                        className="ml-3 bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-rose-600 hover:text-blue-gray-700 focus:outline-none focus:border-blue-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-gray-50 focus:ring-blue-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 sm:col-span-6">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                                Cover photo
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-rose-500 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="bg-white sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-3">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Contacts</h3>
                                    <span className="text-sm text-gray-500" id="email-optional">
                                        Optional
                                    </span>
                                    <br />
                                    <div className="note-container">
                                        <ContactForm onDone={handleAddEdit} />
                                        <br />
                                        <ContactList
                                            contacts={contacts}
                                            onDelete={handleDelete}
                                            onDone={handleAddEdit}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                        <button
                            type="submit"
                            className="mt-3 inline-flex items-end px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    function GuidesTab() {
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {guides.map((guide) => (
                        <li key={guide.id}>
                            <a href="#" className="block hover:bg-gray-50">
                                <div className="px-4 py-4 flex items-center sm:px-6">
                                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div className="truncate">
                                            <div className="flex text-sm items-center">
                                                <p className="text-xl font-medium text-rose-500 truncate">{guide.title}</p>
                                                <p className="ml-3 flex-shrink-0 font-normal text-gray-500">Edited <time dateTime={guide.dateEdited}>{guide.dateEdited}</time></p>
                                            </div>
                                            <div className="mt-2 flex">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    <p>
                                                        Created on <time dateTime={guide.datePublished}>{guide.datePublished}</time>
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
        )
    }

    function ThreadsTab() {
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {threads.map((thread) => (
                        <li key={thread.id}>
                            <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                        <div className="flex text-sm items-center">
                                            <p className="text-xl font-medium text-rose-500 truncate">{thread.title}</p>
                                            <a href="#" className="block hover:bg-gray-50">
                                                <p className="ml-3 text-l font-medium hover:text-rose-700 text-gray-500 truncate">{thread.forum.forumTitle}</p>
                                            </a>
                                        </div>
                                        <div className="mt-2 flex">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <p>
                                                    Created on <time dateTime={thread.date}>{thread.date}</time>
                                                </p>
                                            </div>
                                            <div className="ml-5 flex items-center text-sm text-gray-500">
                                                <AnnotationIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <p>
                                                    {thread.posts} posts
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                                        <div className="flex overflow-hidden -space-x-1">

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        View
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    function PostsTab() {
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {posts.map((p) => (
                        <li key={p.creator.email}>

                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">

                                    <div className="min-w-0 flex-1 px-2 md:gap-2">
                                        <div>
                                            <p className="text-sm font-medium text-rose-500 truncate">{p.creator.forumTitle}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-900">
                                                <span className="truncate">Thread {p.creator.threadTitle}</span>
                                            </p>
                                        </div>
                                        <div className="md:block">
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <p>
                                                    <time dateTime={p.date}>{p.date}</time>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="md:block">
                                            <div className="mt-2 flex items-center text-sm text-gray-700">
                                                <p>
                                                    {p.postContents}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        View
                                    </a>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    function FavouriteTab() {
        return (
            <div>
                <Listbox value={selected} onChange={setSelected}>
                    <div className="p-5 mt-1 relative">
                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                            <span className="block truncate">{selected.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {favouriteFilter.map((filter) => (
                                    <Listbox.Option
                                        key={filter.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-rose-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                            )
                                        }
                                        value={filter}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                    {filter.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-rose-600',
                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
                <FilterFavourites />
            </div>
        )
    }

    function FilterFavourites() {
        let filtered = [];
        if (selected.name === 'Guides') {
            filtered = favourites.filter((f) => f.type === 'Guide')
        } else {
            filtered = favourites.filter((f) => f.type === 'Post')
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
                                        <a href="#" className="block hover:bg-gray-50">
                                            <StarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </a>
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

    function RenderTabs() {
        if (user.accountType === 'Student') {
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
        }
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

    return (
        <div className="relative min-h-screen bg-gray-100">
            <NavBar
                buttonContent="forum"
                disableButton={user.accountType !== "ADMIN"}
                component={<NewButton content='forum' path='/create' />}
                user={user}
            />
            <div className="py-10">
                <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <SideBar user={user}/>
                    </div>
                    <main className="lg:col-span-9 xl:col-span-9 bg-white">
                        <article>
                            {/* Profile header */}
                            <div>
                                <div>
                                    <img className="h-32 w-full object-cover lg:h-48 xl:h-56 rounded-md" src={user.coverImageUrl} alt="" />
                                </div>
                                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                        <div className="flex">
                                            <img
                                                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                                src={user.imageUrl}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="p-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{user.name}</h2>
                                        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                            {user.accountType === 'Staff' ? (
                                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                                    <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    Staff
                                                </div>
                                            ) : (
                                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                                    <AcademicCapIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    Student
                                                </div>
                                            )
                                            }
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <LibraryIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                {user.faculty}
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
                </div>
            </div>
        </div>
    )
}