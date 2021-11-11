import { useEffect, useState } from 'react'

import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import NewButton from '../../components/newButton'
import GuideList from './guideList'
import api from '../../util/api'
import GuideCategories from '../../components/guideCategories'

const tabs = [//need to change to category
    { name: 'Recent', href: '#', current: true },
    { name: 'Most Liked', href: '#', current: false },
    { name: 'Most Answers', href: '#', current: false },
]

export default function GuidesPage() {
    const [user, setUser] = useState(null)
    const [categories, setCategories] = useState([])
    const [guides, setGuides] = useState([])
    const [error, setError] = useState(null)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        api.getUser()
            .then(response => setUser(response.data))
            .catch((error) => (
                setError(error)
            ))
    }, [])

    useEffect(() => {
        api.getCategories()
            .then((response) => {
                setCategories(response.data)
                setSelected(response.data[0])
            })
            .catch((error) => (
                setError(error)
            ))
    }, [])

    useEffect(() => {
        api.getGuides()
            .then((response) => {
                setGuides(response.data)
            })
            .catch((error) => (
                setError(error)
            ))
    }, [])

    if (error) return `Error: ${error.message}`

    return (
        user &&
        <div className="relative min-h-screen bg-gray-100">
            <NavBar
                buttonContent="guide"
                disableButton={user.accountType === "STUDENT" || !categories.length}
                component={<NewButton content='guide' path='/createGuide' />}
                disableSearch={true}
                user={user}
            />
            <div className="py-10">
                <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <SideBar user={user} />
                    </div>
                    <main className="lg:col-span-9 xl:col-span-10">
                        {categories.length && selected ?
                            <GuideCategories categories={categories} selected={selected} setSelected={setSelected} />
                            : <div className="text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        vectorEffect="non-scaling-stroke"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
                            </div>
                        }
                        {/* {guides.length && <GuideList
                            items={guides}
                            setGuides={setGuides}
                            user={user}
                        />} */}
                    </main>
                </div>
            </div>
        </div>

    )
}