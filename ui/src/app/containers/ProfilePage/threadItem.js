import {
    CalendarIcon,
    AnnotationIcon,
    LibraryIcon,
    CheckCircleIcon,
} from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../util/api'

export default function ThreadItem({ thread }) {
    const [forum, setForum] = useState(null)

    useEffect(() => {
        async function getForum() {
            await api.getThreadForum(thread.id)
                .then(response => setForum(response.data))
        }
        getForum()
    }, [thread.id])

    return (
        forum &&
        <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="truncate">
                    <div className="flex text-sm sm:items-center">
                        <a href={`/${forum.id}/threads`} className="block hover:bg-gray-50">
                            <p className="mr-3 text-xl font-medium hover:text-rose-600 text-gray-500 truncate">{forum.title}</p>
                        </a>
                        <p> <ChevronRightIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> </p>
                        <p className="text-xl font-medium text-rose-500 truncate">{thread.title}</p>
                    </div>
                    <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                                Created {moment(thread.created.slice(0, -5)).format("DD/MM/YY")}
                            </p>
                        </div>
                        <div className="ml-5 flex items-center text-sm text-gray-500">
                            <AnnotationIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                                {thread.posts.length} posts
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
                <Link to={`/${forum.id}/threads/${thread.id}/posts`}
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                >
                    View
                </Link>
            </div>
        </div>
    )
}