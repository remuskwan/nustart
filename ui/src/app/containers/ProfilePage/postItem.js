import { AnnotationIcon, CalendarIcon, ChevronRightIcon } from "@heroicons/react/outline";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../util/api";

const defaultThread = {
    "closed": false,
    "created": "2021-11-09T16:00:00Z[UTC]",
    "creator": {
        "accountStatus": "ACTIVE",
        "accountType": "ADMIN",
        "contacts": [],
        "course": "default",
        "coverImage": "default",
        "created": "2021-11-09T16:00:00Z[UTC]",
        "email": "admin01@mail.com",
        "faculty": "default",
        "id": 1,
        "likedGuides": [],
        "likedPosts": [],
        "password": "1234567aA@",
        "profilePicture": "default",
        "username": "Admin01",
        "yr": "0"
    },
    "id": 1,
    "pinned": false,
    "posts": [
        {
            "content": "sdafasf",
            "createdAt": "2021-11-09T16:00:00Z[UTC]",
            "creator": {
                "accountStatus": "ACTIVE",
                "accountType": "ADMIN",
                "contacts": [],
                "course": "default",
                "coverImage": "default",
                "created": "2021-11-09T16:00:00Z[UTC]",
                "email": "admin01@mail.com",
                "faculty": "default",
                "id": 1,
                "likedGuides": [],
                "likedPosts": [],
                "password": "1234567aA@",
                "profilePicture": "default",
                "username": "Admin01",
                "yr": "0"
            },
            "id": 1,
            "likes": 0
        }
    ],
    "title": "dfasf"
}

const defaultForum = {
    "created": "2021-11-09T16:00:00Z[UTC]",
    "creator": {
        "accountStatus": "ACTIVE",
        "accountType": "ADMIN",
        "contacts": [],
        "course": "default",
        "coverImage": "https://nustart.s3.amazonaws.com/defaultcoverImage.jpg",
        "created": "2021-11-09T16:00:00Z[UTC]",
        "email": "admin01@mail.com",
        "faculty": "default",
        "id": 1,
        "likedGuides": [],
        "likedPosts": [],
        "password": "1234567aA@",
        "profilePicture": "https://nustart.s3.amazonaws.com/external-content.duckduckgo.com.jpg",
        "username": "Admin01",
        "yr": "0"
    },
    "description": "aaaaaaaaaaaa",
    "id": 1,
    "threads": [
        {
            "closed": false,
            "created": "2021-11-09T16:00:00Z[UTC]",
            "creator": {
                "accountStatus": "ACTIVE",
                "accountType": "ADMIN",
                "contacts": [],
                "course": "default",
                "coverImage": "https://nustart.s3.amazonaws.com/defaultcoverImage.jpg",
                "created": "2021-11-09T16:00:00Z[UTC]",
                "email": "admin01@mail.com",
                "faculty": "default",
                "id": 1,
                "likedGuides": [],
                "likedPosts": [],
                "password": "1234567aA@",
                "profilePicture": "https://nustart.s3.amazonaws.com/external-content.duckduckgo.com.jpg",
                "username": "Admin01",
                "yr": "0"
            },
            "id": 1,
            "pinned": false,
            "posts": [
                {
                    "content": "aaaaaaaaaaaaaaaaaaaa",
                    "createdAt": "2021-11-09T16:00:00Z[UTC]",
                    "creator": {
                        "accountStatus": "ACTIVE",
                        "accountType": "ADMIN",
                        "contacts": [],
                        "course": "default",
                        "coverImage": "https://nustart.s3.amazonaws.com/defaultcoverImage.jpg",
                        "created": "2021-11-09T16:00:00Z[UTC]",
                        "email": "admin01@mail.com",
                        "faculty": "default",
                        "id": 1,
                        "likedGuides": [],
                        "likedPosts": [],
                        "password": "1234567aA@",
                        "profilePicture": "https://nustart.s3.amazonaws.com/external-content.duckduckgo.com.jpg",
                        "username": "Admin01",
                        "yr": "0"
                    },
                    "id": 1,
                    "likes": 0
                }
            ],
            "title": "aaaaaaaaa"
        }
    ],
    "title": "saaaaaaaaaa"
}

export default function PostItem({ p }) {
    const [thread, setThread] = useState(defaultThread)
    const [forum, setForum] = useState(defaultForum)

    useEffect(() => {
        async function getThread() {
            await api.getPostThread(p.id)
                .then(response => setThread(response.data))
                .then(() => getForum(thread))
        }
        getThread()
    }, [])

    async function getForum(t) {
        await api.getThreadForum(t.id).then(response => setForum(response.data))
    }

    return (
        <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="truncate">
                    <div className="flex text-sm sm:items-center">
                        <a href={`/${forum.id}/threads`} className="block hover:bg-gray-50">
                            <p className="mr-3 text-xl font-medium hover:text-rose-600 text-gray-500 truncate">{forum.title}</p>
                        </a>
                        <p> <ChevronRightIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> </p>
                        <a href={`/${forum.id}/threads/${thread.id}/posts`} className="block hover:bg-gray-50">
                            <p className="mr-3 text-xl font-medium text-rose-500 truncate">{thread.title}</p>
                        </a>
                    </div>
                    <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                                Posted {moment(thread.created.slice(0, -5)).format("DD/MM/YY")}
                            </p>
                        </div>
                    </div>
                    <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                            {/* <p> <ChevronRightIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> </p> */}
                            <div className="text-xl font-medium text-rose-500 truncate"dangerouslySetInnerHTML={{ __html: postMessage.content }} />
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