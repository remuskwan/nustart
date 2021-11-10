
import PostItem from "./postItem";

export default function PostsTab({ posts }) {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {posts.map((p) => (
                    <li key={p.creator.email}>
                        <PostItem p={p} />
                    </li>
                ))}
            </ul>
        </div>
    )
}