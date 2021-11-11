import { useEffect, useState } from 'react'

import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import api from '../../util/api'
import NewButton from '../../components/newButton'
import { useRouteMatch } from 'react-router'
import MapsTable from '../../components/mapsTable'


export default function ManageMapsPage() {
  const { url } = useRouteMatch()
  const [user, setUser] = useState(null)
  const [maps, setMaps] = useState([])
  const [open, setOpen] = useState(true)
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
      .then((response) => {
          setMaps(response.data)
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
          buttonContent="forum"
          disableButton={user.accountType !== "ADMIN"}
          component={
            <NewButton content='map' path="/admin/campus/create" />
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
              <div className="mt-4">
                <h1 className="sr-only">Maps</h1>
                <MapsTable items={maps} dataLimit={10} />
              </div>
            </main>
          </div>
        </div>
      </div>
  )
}