import { Fragment, useState, useEffect, useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import moment from 'moment'
import {
    ChevronRightIcon,
} from '@heroicons/react/solid'
import {
    BanIcon,
    CalendarIcon,
    CheckCircleIcon,
    SearchIcon,
    ExclamationIcon
} from '@heroicons/react/outline'
import api from '../../util/api'
import { Link } from 'react-router-dom'

export default function AllUsersTab() {
    const [allUsers, setAllUsers] = useState([])
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        let isMounted = true;
        api.getUsers().then(users => {
            if (isMounted) setAllUsers(users.data);    // add conditional check
        })
        return () => { isMounted = false };
    }, [])

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
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
                            <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                        <div className="flex text-sm items-center">
                                            <p className="text-xl font-medium text-rose-500 truncate">{user.email}</p>
                                            <p className="ml-3 flex-shrink-0 font-normal text-gray-500">{user.accountType}</p>
                                        </div>
                                        <div className="mt-2 flex">
                                            <div className="flex items-center text-sm text-gray-500">
                                                {user.accountStatus}
                                                <CalendarIcon className="ml-2 flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                {moment(user.created.slice(0, -5)).format('MMMM Do YYYY [at] h:mm a')}  
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                                        <div className="flex overflow-hidden -space-x-1">

                                        </div>
                                    </div>
                                </div>
                                <div className="ml-5 flex items-center">
                                    {/* {user.accountStatus === "BLOCKED"
                                        ?
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                        >
                                            <CheckCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                            Unblock
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                            onClick={() => setOpen(true)}
                                        >
                                            <BanIcon className="mr-3 h-4 w-4" aria-hidden="true"
                                            />
                                            Block
                                        </button>

                                    } */}
                                    {/* <div>
                                        <a
                                            // href={`/profile/${user.id}`}
                                            href='#'
                                            className="ml-3 inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                            onClick={() => console.log(user.id)}
                                        >
                                            View
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                            <ConfirmationDialog />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}