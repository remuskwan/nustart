import axios from 'axios'
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  DotsVerticalIcon,
  PencilIcon,
} from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/outline'
import ConfirmDialog from '../../components/confirmDialog'
import EditGuideModal from './editGuide'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GuideOptions({guide, setGuides}) {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  function deleteGuide() {
    axios.delete(`http://localhost:8080/NUStartApplication-war/webresources/guides/${guide.id}`)
      .then(() =>
        axios.get("http://localhost:8080/NUStartApplication-war/webresources/guides")
          .then((response) => setGuides(response.data))
      )
  }

  return (
    <Fragment>
      <Menu as="div" className="relative inline-block text-left z-10">
        <div>
          <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full flex px-4 py-2 text-sm'
                    )}
                    onClick={() => setOpenEdit(true)}
                  >
                    <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Edit guide</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full flex px-4 py-2 text-sm'
                    )}
                    onClick={() => setOpen(true)}
                  >
                    <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Delete guide</span>

                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <ConfirmDialog
        title="guide"
        item={guide}
        open={open}
        setOpen={setOpen}
        onConfirm={deleteGuide}
      />
      <EditGuideModal guide={guide} setGuides={setGuides} open={openEdit} setOpen={setOpenEdit} />
    </Fragment>

  )
}