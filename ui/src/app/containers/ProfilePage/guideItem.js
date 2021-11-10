import moment from "moment"
import { ChevronRightIcon } from "@heroicons/react/solid"
import {
    CalendarIcon,
    ChatAlt2Icon,
} from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import api from "../../util/api"

const defaultCategory = {
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
    "guides": [
        {
            "comments": [],
            "content": "aaaa",
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
            "dateCreated": "2021-11-09T16:00:00Z[UTC]",
            "id": 1,
            "links": [],
            "pictureUrl": "  ",
            "title": "aaaaaaa"
        },
    ],
    "id": 1,
    "name": "category1"
}

export default function GuideItem({ guide }) {

    const [category, setCategory] = useState(defaultCategory)

    useEffect(() => {
        async function getCategory() {
            await api.getGuideCategory(guide.id)
                .then(response => setCategory(response.data))
                //.then(() => console.log(category))
        }
        getCategory()
    }, [])

    return (

        <div className="px-4 py-4 flex items-center sm:px-6">
            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="truncate">
                    <div className="flex text-sm items-center">
                        <a href={`/categories/${category.id}/guides`} className="block hover:bg-gray-50">
                            <p className="text-xl font-medium text-rose-600 truncate">{category.name}</p>
                        </a>
                        <ChevronRightIcon className="ml-2 flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <a href={`/categories/${category.id}/guides/${guide.id}`} className="block hover:bg-gray-50">
                            <p className="text-xl font-small text-rose-500 truncate">{guide.title}</p>
                        </a>
                        <ChatAlt2Icon className="ml-2 flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <p className=" flex-shrink-0 font-normal text-gray-500">{guide.comments.length} comments </p>
                    </div>
                    <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                                Created {moment(guide.dateCreated.slice(0, -5)).format("DD/MM/YY")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex overflow-hidden -space-x-1">

                    </div>
                </div>
            </div>
            <div className="ml-5 flex-shrink-0">
                <a href={`/categories/${category.id}/guides/${guide.id}`} className="block hover:bg-gray-50">
                    <ChevronRightIcon className="h-7 w-7 text-gray-400" aria-hidden="true" />
                </a>
            </div>
        </div>

    )
}