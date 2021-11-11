
import ThreadItem from './threadItem'

export default function ThreadsTab({ threads = [] }) {

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {threads.map((thread) => (
                    <li key={thread.id}>
                        <ThreadItem thread={thread} />
                    </li>
                ))}
            </ul>
        </div>
    )
}