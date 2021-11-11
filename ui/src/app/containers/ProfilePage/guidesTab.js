import GuideItem from "./guideItem"

export default function GuidesTab({ guides = [] }) {

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {guides.map((guide) => (
                    <li key={guide.id}>
                        <GuideItem guide={guide} />
                    </li>
                ))}
            </ul>
        </div>
    )
}