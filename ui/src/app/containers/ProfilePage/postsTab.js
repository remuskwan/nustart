import { CalendarIcon } from "@heroicons/react/solid";

export default function PostsTab({ posts }) {
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