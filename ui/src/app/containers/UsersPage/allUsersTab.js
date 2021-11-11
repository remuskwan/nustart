import { Fragment, useState, useEffect, useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import moment from 'moment'
import {
    CalendarIcon,
    ExclamationIcon
} from '@heroicons/react/outline'
import api from '../../util/api'
import UserList from './userList'
import ThreadPaginator from '../../components/Paginator/threadPaginator'
import SortSelectMenu from '../../components/SelectMenus/sortSelectMenu'

const sortTypes = [
    { id: 1, name: 'Recent', sortType: 'created', reverse: false },
    { id: 2, name: 'Email', sortType: 'email', reverse: true },
    { id: 2, name: 'Username', sortType: 'username', reverse: true },
    { id: 2, name: 'Role', sortType: 'accountType', reverse: true },
    { id: 2, name: 'Status', sortType: 'accountStatus', reverse: true },
]

export default function AllUsersTab({ searchString, searchType }) {
    const [allUsers, setAllUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [sortType, setSortType] = useState(sortTypes[0])
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        let isMounted = true;
        api.getUsers().then(response => {
            const searchSortItems = (type, searchString, searchType) => {
                const types = {
                    created: 'created',
                    accountType: 'accountType',
                    accountStatus: 'accountStatus',
                    email: 'email',
                    username: 'username',
                }
                const searchTypes = {
                    username: 'username',
                    email: 'email',
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
                    .sort((x, y) => y[sortProperty].localeCompare(x[sortProperty])
                        || y['created'].localeCompare(x['created']))
                if (isMounted) setAllUsers(sorted);    // add conditional check
            }
            searchSortItems(sortType.sortType, searchString, searchType.searchType)
        })
        return () => { isMounted = false };
    }, [sortType.sortType, searchString, searchType.searchType])

    function ConfirmationDialog() {
        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Deactivate account
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to deactivate your account? All of your data will be permanently removed.
                                                    This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }

    return (
        <div>
            <div className="pt-6 pb-4">
                <SortSelectMenu options={sortTypes} sortType={sortType} setSortType={setSortType} />
            </div>
            <ThreadPaginator
                data={allUsers}
                component={UserList}
                dataLimit={8}
            />

        </div>
    )
}