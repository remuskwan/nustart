import { useState, useEffect, useRef } from 'react'
import {
    BanIcon,
    CheckCircleIcon,
} from '@heroicons/react/outline'
import api from '../../util/api'

export default function BlockTab({sortType, searchString, searchType}) {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        api.getUsers()
            .then(response => {
                const searchSortItems = (type, searchString, searchType) => {
                    const types = {
                        created: 'created',
                        // role: 'isAdmin',
                        email: 'email',
                        username: 'username',
                    }
                    const searchTypes = {
                        username: 'username',
                        email: 'email',
                    }
                    const sortProperty = types[type]
                    const searchProperty = searchTypes[searchType]
                    const filtered = [...response.data.filter((user) => (user.accountStatus === 'ACTIVE' || user.accountStatus === 'BLOCKED') && user.accountType !== "ADMIN")]
                        .filter((user) => {
                            if (searchString === '') {
                                return user
                            } else if (user[searchProperty].toLowerCase().includes(searchString.toLowerCase())) {
                                return user
                            }
                        })
                    const sorted = [...filtered]
                        .sort((x, y) =>
                            sortProperty === 'isAdmin'
                                ? y[sortProperty] - x[sortProperty]
                                : y[sortProperty].localeCompare(x[sortProperty]))
                    setAllUsers(sorted);    
                }
                searchSortItems(sortType, searchString, searchType.searchType)
                // setAllUsers(users.data.filter((user) => (user.accountStatus === 'ACTIVE' || user.accountStatus === 'BLOCKED') && user.accountType !== "ADMIN"));
            })
    }, [sortType, searchString, searchType.searchType])

    function toggleBlock(user) {
        user.accountStatus = user.accountStatus === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED'
        api.editUser(user.id, user)
            .then(() => {
                api.getUsers()
                    .then((response) => setAllUsers(response.data))
            })
    }

    return (
        allUsers &&
        <div>
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
                                                toggleBlock(user);
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
                                                toggleBlock(user);
                                            }}
                                        >
                                            <BanIcon className="mr-3 h-4 w-4" aria-hidden="true"
                                            />
                                            Block
                                        </button>

                                    }
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}