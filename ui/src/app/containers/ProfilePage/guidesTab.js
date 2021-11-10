import moment from "moment"
import { ChevronRightIcon } from "@heroicons/react/solid"
import {
    CalendarIcon,
    ChatAlt2Icon,
} from "@heroicons/react/outline"

export default function GuidesTab({ guides = [] }) {
    
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {guides.map((guide) => (
                    <li key={guide.id}>
                        <a href="#" className="block hover:bg-gray-50">
                            <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                        <div className="flex text-sm items-center">
                                            <p className="text-xl font-medium text-rose-500 truncate">{guide.title}</p>
                                            <ChatAlt2Icon className="ml-2 flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <p className=" flex-shrink-0 font-normal text-gray-500">{guide.comments.length} comments </p>
                                        </div>
                                        <div className="mt-2 flex">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <p>
                                                    {moment(guide.dateCreated.slice(0, -5)).format("DD/MM/YY")}
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
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}