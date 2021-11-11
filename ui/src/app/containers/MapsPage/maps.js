import { Component, Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import { getUser } from '../../util/Common'

export default class MapsPage extends Component {
    render() {
        return (
            <div className="relative min-h-screen bg-gray-100">
                <NavBar />
                    <div className="py-10">
                    <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <SideBar />
                    </div>
                    </div>
                    </div>
          </div>
        )

    }

}