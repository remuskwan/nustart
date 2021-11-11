// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
// import NavBar from "../../components/navBar";
// import SideBar from '../../components/sideBar';
// import { getUser } from '../../util/Common';
// import InputText from '../../components/inputText';
// import TextArea from '../../components/textArea';

// export default function AddForumPage() {
//   const history = useHistory()
//   const [user, setUser] = useState(null)
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [error, setError] = useState(null);

//   const handleSubmit = (evt) => {
//     evt.preventDefault()
//     createForum()
//     alert("Successfully created forum.")
//   }

//   function createForum() {
//     axios
//       .post(`http://localhost:8080/NUStartApplication-war/webresources/forums`, {
//         title: title,
//         description: description,
//         creator: user,
//       })
//       .then(() => history.goBack())
//       .catch(error => setError(error))
//   }

//   useEffect(() => {
//     axios.get(`http://localhost:8080/NUStartApplication-war/webresources/users/1`)
//       .then(response => setUser(response.data))
//       .catch((error) => setError(error))
//   }, [])

//   return (
//     <div className="relative min-h-screen bg-gray-100">
//       <NavBar buttonContent="thread" disableButton={true} />
//       <div className="py-10">
//         <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
//           <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
//             <SideBar />
//           </div>
//           <main className="lg:col-span-9 xl:col-span-10">
//             <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
//               <form onSubmit={handleSubmit}>
//                 <div className="shadow sm:rounded-md sm:overflow-hidden">
//                   <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
//                     <div>
//                       <h3 className="text-lg leading-6 font-medium text-gray-900">New Forum</h3>
//                       <p className="mt-1 text-sm text-gray-500">
//                         This information will be displayed publicly so be careful what you share.
//                       </p>
//                     </div>
//                     <div className="grid grid-cols-3 gap-6">
//                       <div className="col-span-3 sm:col-span-2">
//                         <InputText
//                           type="text"
//                           name="title"
//                           id="title"
//                           label="Title"
//                           autoComplete="title"
//                           autoFocus={true}
//                           required={true}
//                           value={title}
//                           onChange={(e) => setTitle(e.target.value)}
//                         />
//                       </div>
//                       <div className="col-span-3">
//                         <TextArea
//                           name="description"
//                           id="description"
//                           label="Description"
//                           required={true}
//                           value={description}
//                           onChange={(e) => setDescription(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
//                     <button
//                       type="submit"
//                       className="bg-rose-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
//                     >
//                       Create
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   )
// }