import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import InputText from '../../components/inputText'


export default function AddThreadModal(props) {
  const [title, setTitle] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    createThread()
    alert("Successfully added thread.")
    props.setOpen(false)
  }

  function createThread() {
    console.log(props.user)
    axios
      .post(`http://localhost:8080/IS3106Assignment1-war/webresources/forums/${props.forum.id}/threads`, {
        title: title,
        creator: props.user,
      })
      .then((response) => {
        props.setForum(props.forum.threads.push(response.data))
      })
      .catch(error => setError(error))
  }

  function validateForm() {
    return title !== ''
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          {/* <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span> */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <form onSubmit={handleSubmit}>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Add thread
                    </Dialog.Title>
                    <div className="mt-2 text-left">
                      <InputText
                        type="text"
                        name="title"
                        id="title"
                        label="Title"
                        placeholder="Enter a thread title"
                        autoComplete="title"
                        required={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:text-sm"
                    disabled={!validateForm()}
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}