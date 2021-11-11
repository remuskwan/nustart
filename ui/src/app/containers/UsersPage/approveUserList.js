import {
    BanIcon,
    CheckCircleIcon,
} from '@heroicons/react/outline'


export default function ApproveUserList({ items, approve, reject }) {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {(!items || !items.length) ?
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
                    : items.map((user) => (
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
                                                reject(user);
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
        </div>)
}