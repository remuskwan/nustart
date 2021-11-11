import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import NewButton from '../../components/newButton'
import MapSelectMenu from '../../components/SelectMenus/mapsSelectMenu'
import api from '../../util/api'

export default function CampusPage() {
    const { url } = useRouteMatch()
    const [user, setUser] = useState(null)
    const [maps, setMaps] = useState([])
    const [selected, setSelected] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        api.getUser()
            .then(response => setUser(response.data))
            .catch((error) => (
                setError(error)
            ))
    }, [])

    useEffect(() => {
        api.getMaps()
            .then(response => {
                setMaps(response.data)
                setSelected(response.data[0])
            })
            .catch((error) => (
                setError(error)
            ))
    }, [])
    return (
        user &&
        <div className="relative min-h-screen bg-gray-100">
            <NavBar
                buttonContent="forum"
                disableButton={user.accountType !== "ADMIN"}
                component={
                    <NewButton content='map' path={`${url}/create`} />
                }
                user={user}
                disableSearch={true}
            />
            <div className="py-10">
                <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <SideBar user={user} />
                    </div>
                    <main className="lg:col-span-9 xl:col-span-10">
                        {maps.length && selected ?
                            <MapSelectMenu options={maps} selected={selected} setSelected={setSelected} />
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
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No maps</h3>
                            </div>
                        }
                    </main>
                </div>
            </div>
        </div>
    )

}