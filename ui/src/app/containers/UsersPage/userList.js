import moment from 'moment'
import {
    CalendarIcon,
    ExclamationIcon
} from '@heroicons/react/outline'
import { Transition, Dialog } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef } from 'react'

export default function UserList({ items }) {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {(!items || !items.length) ?
                    <li key='No users'>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div className="truncate">
                                    <div className="flex text-sm items-center">
                                        <p className="text-xl font-medium text-rose-500 truncate">No users</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    : items.map((user) => (
                        <li key={user.id}>
                            <a href={`/profile/${user.id}`}>
                                <div className="px-4 py-4 flex items-center sm:px-6 hover:bg-gray-50">
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
                                    </div>
                                </div>
                            </a>
                            {/* <ConfirmationDialog /> */}
                        </li>
                    ))}
            </ul>
        </div>
    )
}