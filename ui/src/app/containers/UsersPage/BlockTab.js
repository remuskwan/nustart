import { Fragment, useState, useEffect, useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'
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

export default function BlockTab() {
    const [allUsers, setAllUsers] = useState([])
    //const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [status, setStatus] = useState('ACTIVE')

    useEffect(() => {
        let isMounted = true;
        api.getUsers().then(users => {
            if (isMounted) setAllUsers(users.data);    
        })
        return () => { isMounted = false };
    }, [])

    useEffect(() => {       
        api.getUsers().then(users => {
            setAllUsers(users.data);   
        })
        console.log(allUsers)
    }, [status])

    function blockUser(user) {
        // axios.put(`http://localhost:8080/NUStartApplication-war/webresources/users/${user.id}`,
        //     {
        //         accountStatus: "ACTIVE",
        //         email: user.email,
        //         faculty: user.faculty,
        //         course: user.course,
        //         profilePicture: user.profilePicture,
        //         password: user.password,
        //         yr: user.yr,
        //     }
        // )
        // setOpen(false)
        api.editUser(user.id, {
            accountStatus: status,
            email: user.email,
            faculty: user.faculty,
            course: user.course,
            profilePicture: user.profilePicture,
            password: user.password,
            yr: user.yr,
        }).then(() => api.getUsers()).then(response => setAllUsers(response.data))
    }

    function unblockUser(user) {
        api.editUser(user.id, {
            accountStatus: status,
            email: user.email,
            faculty: user.faculty,
            course: user.course,
            profilePicture: user.profilePicture,
            password: user.password,
            yr: user.yr,
        }).then(() => api.getUsers()).then(response => setAllUsers(response.data))
    }

    return (
        allUsers &&
        <div>
            {/* <div className="px-6 pt-6 pb-4">
                <form className="mt-6 flex space-x-4" action="#">
                    <div className="flex-1 min-w-0">
                        <div className="relative rounded-md shadow-sm">
                        </div>
                    </div>
                </form>
            </div> */}
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
                                                {/* <CalendarIcon className="ml-2 flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <p>
                                                    Created on <time dateTime={user.created}>{user.created}</time>
                                                </p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                                        <div className="flex overflow-hidden -space-x-1">

                                        </div>
                                    </div>
                                </div>
                                <div className="ml-5 flex items-center">
                                    {user.accountStatus === "BLOCKED"
                                        ?
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                            onClick={() => {
                                                console.log('unblock')
                                                setStatus('ACTIVE');
                                                unblockUser(user);
                                            }}
                                        >
                                            <CheckCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                            Unblock
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                            onClick={() => {
                                                console.log('block')
                                                // setStatus('BLOCKED');
                                                // blockUser(user);
                                            }}
                                        >
                                            <BanIcon className="mr-3 h-4 w-4" aria-hidden="true"
                                            />
                                            Block
                                        </button>

                                    }
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
                            {/* <ConfirmationDialog user={user} /> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}