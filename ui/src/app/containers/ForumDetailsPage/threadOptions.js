// import axios from 'axios'
// import { Fragment, useState } from 'react'
// import { Menu, Transition } from '@headlessui/react'
// import {
//   DotsVerticalIcon,
//   PencilIcon,
// } from '@heroicons/react/solid'
// import { TrashIcon } from '@heroicons/react/outline'
// import ConfirmDialog from '../../components/confirmDialog'
// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function ThreadOptions(props) {
//   const [open, setOpen] = useState(false)

//   function deleteThread() {
//     axios.delete(`http://localhost:8080/IS3106Assignment1-war/webresources/forums/${props.forum.id}/threads/${props.thread.id}`)
//       .then(() => props.action(null))
//   }

//   return (
//     <Fragment>
//       <Menu as="div" className="relative inline-block text-left">
//         <div>
//           <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
//             <span className="sr-only">Open options</span>
//             <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
//           </Menu.Button>
//         </div>

//         <Transition
//           as={Fragment}
//           enter="transition ease-out duration-100"
//           enterFrom="transform opacity-0 scale-95"
//           enterTo="transform opacity-100 scale-100"
//           leave="transition ease-in duration-75"
//           leaveFrom="transform opacity-100 scale-100"
//           leaveTo="transform opacity-0 scale-95"
//         >
//           <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//             <div className="py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <a
//                     href="#"
//                     className={classNames(
//                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                       'flex px-4 py-2 text-sm'
//                     )}
//                   >
//                     <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
//                     <span>Edit thread</span>
//                   </a>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={classNames(
//                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                       'flex px-4 py-2 text-sm'
//                     )}
//                     onClick={() => setOpen(true)}
//                   >
//                     <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
//                     <span>Delete thread</span>
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Transition>
//       </Menu>
//       <ConfirmDialog
//         title="forum"
//         item={props.thread}
//         open={open}
//         setOpen={setOpen}
//         onConfirm={deleteThread}
//       />
//     </Fragment>

//   )
// }