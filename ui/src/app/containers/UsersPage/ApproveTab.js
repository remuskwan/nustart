import { useState, useEffect } from 'react'
import {
    BanIcon,
    CheckCircleIcon,
} from '@heroicons/react/outline'
import SortSelectMenu from '../../components/SelectMenus/sortSelectMenu'
import api from '../../util/api'

const sortTypes = [
    { id: 1, name: 'Recent', sortType: 'created', reverse: false },
    { id: 2, name: 'Email', sortType: 'email', reverse: true },
    { id: 2, name: 'Username', sortType: 'username', reverse: true },
    { id: 2, name: 'Status', sortType: 'accountStatus', reverse: true },
]

export default function ApproveTab({ searchString, searchType }) {
    const [allUsers, setAllUsers] = useState([])
    const [sortType, setSortType] = useState(sortTypes[0])

    useEffect(() => {
        api.getUsers()
            .then(response => {
                const searchSortItems = (type, searchString, searchType) => {
                    const types = {
                        created: 'created',
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
                        .filter((user) => (user.accountStatus === 'UNAPPROVED' || user.accountStatus === 'REJECTED') && user.accountType === "STAFF")
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
                    setAllUsers(sorted)
                }
                searchSortItems(sortType.sortType, searchString, searchType.searchType)
                // setAllUsers(users.data.filter((user) => (user.accountStatus === 'UNAPPROVED' || user.accountStatus === 'REJECTED') && user.accountType === "STAFF"));
            })
    }, [sortType.sortType, searchString, searchType.searchType])

    function approve(user) {
        user.accountStatus = 'ACTIVE'
        api.editUser(user.id, user)
            .then(() => {
                api.getUsers()
                    .then((response) => setAllUsers(response.data.filter((user) => (user.accountStatus === 'UNAPPROVED' || user.accountStatus === 'REJECTED') && user.accountType === "STAFF")))
            })
    }

    function disapprove(user) {
        user.accountStatus = 'REJECTED'
        api.editUser(user.id, user)
            .then(() => {
                api.getUsers()
                    .then((response) => setAllUsers(response.data.filter((user) => (user.accountStatus === 'UNAPPROVED' || user.accountStatus === 'REJECTED') && user.accountType === "STAFF")))
            })
    }

    return (
        allUsers &&
        <div>
            <div className="pt-6 pb-4">
                <SortSelectMenu options={sortTypes} sortType={sortType} setSortType={setSortType} />
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {(!allUsers || !allUsers.length) ?
                        <li key='No users to approve'>
                            <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                        <div className="flex text-sm items-center">
                                            <p className="text-xl font-medium text-rose-500 truncate">No users to approve</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        : allUsers.map((user) => (
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
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                            onClick={() => {
                                                approve(user);
                                            }}
                                        >
                                            <CheckCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                            Approve
                                        </button>
                                        {user.accountStatus !== 'REJECTED' &&
                                            <button
                                                type="button"
                                                className="ml-5 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                                onClick={() => {
                                                    disapprove(user);
                                                }}
                                            >
                                                <BanIcon className="mr-3 h-4 w-4" aria-hidden="true"
                                                />
                                                Reject
                                            </button>}
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}