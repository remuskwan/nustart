import { useEffect, useState } from "react"
import { useParams, useRouteMatch } from "react-router"
import NavBar from "../../components/navBar"
import NewButton from "../../components/newButton"
import SideBar from "../../components/sideBar"
import api from "../../util/api"
import MapSelectMenu from "../../components/SelectMenus/mapsSelectMenu"

export default function MapDetailsPage() {
  const { url } = useRouteMatch()
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [map, setMap] = useState(null)
  const [maps, setMaps] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getMap(id)
      .then(response => setMap(response.data))
      .catch((error) => setError(error))
  }, [id])

  useEffect(() => {
    api.getMaps()
      .then(response => {
        setMaps(response.data)
        setSelected(response.data[0])
      })
      .catch((error) => setError(error))
  }, [])

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => setError(error))
  }, [])

  if (error) return `Error: ${error.message}`

  console.log(maps)

  return (
    (user && map) &&
    <div className="relative min-h-screen bg-gray-100">
      <NavBar
        buttonContent="forum"
        disableButton={true}
        user={user}
        disableSearch={true}
      />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar user={user} />
          </div>
          <main className="lg:col-span-9 xl:col-span-10">
            {(maps.length && selected) &&
              <MapSelectMenu options={maps} map={selected} setMap={setSelected} />}
            <div className="mt-4 flex">
              <h1 className="sr-only">map</h1>
              <img
                src={map.url}
                alt=""
                className="flex-shrink-0 min-w-full"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}