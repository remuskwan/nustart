import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  PencilIcon,
  DotsVerticalIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import ConfirmDialog from '../../confirmDialog'
import Notification from '../../notification'
import api from '../../../util/api'
import EditGuideModal from '../editGuideModal'
import { useHistory } from 'react-router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GuideOptions({ categoryId, guide, setGuide }) {
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [show, setShow] = useState(false)
  const [notifTitle, setNotifTitle] = useState("")

  function deleteGuide() {
    api.deleteGuide(categoryId, guide.id)
      .then(() => history.goBack())
  }

  function triggerNotification() {
    setShow(true)
    setTimeout(() => setShow(false), 3000)
  }

  return (
    <Fragment>
      <Menu as="div" className="relative inline-block text-left">
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
                      'w-full flex justify-left px-4 py-2 text-sm'
                    )}
                    onClick={() => {
                      setOpenEdit(true)
                    }}
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
                      'w-full flex justify-left px-4 py-2 text-sm'
                    )}
                    onClick={() => {
                      setOpen(true)
                    }}
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
      <EditGuideModal
        categoryId={categoryId}
        guide={guide}
        setGuide={setGuide}
        open={openEdit}
        setOpen={setOpenEdit}
        setNotifTitle={setNotifTitle}
        triggerNotification={triggerNotification}
      />
      <Notification show={show} setShow={setShow} action={notifTitle} />
    </Fragment>
  )
}