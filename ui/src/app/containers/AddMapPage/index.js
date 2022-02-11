import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { uploadFile } from 'react-s3';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import InputText from '../../components/inputText';
import UploadImage from '../../components/uploadImage';
import api from '../../util/api';
import { config } from '../../../config';

export default function AddMapPage() {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])
  }
  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then(data => {
        createMap(data.location)
      })
      .catch(error => setError(error))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleUpload(selectedFile)
    alert("Successfully created map.")
  }

  function createMap(location) {
    api.createMap({
      title: title,
      url: location,
    })
      .then(() => history.goBack())
      .catch(error => setError(error))
  }

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => setError(error))
  }, [])

  return (
    user &&
    <div className="relative min-h-screen bg-gray-100">
      <NavBar disableButton={true} disableSearch={true} user={user}/>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar user={user}/>
          </div>
          <main className="lg:col-span-9 xl:col-span-10">
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">New Map</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <InputText
                          type="text"
                          name="title"
                          id="title"
                          label="Title"
                          autoComplete="title"
                          autoFocus={true}
                          required={true}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Map</label>
                        {!selectedFile ?
                          <div >
                            <UploadImage handleFileInput={handleFileInput} accept=".jpg, .png, .gif" required={true}/>
                          </div>
                          : <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 ">
                            {selectedFile.name}
                            <button className="text-gray-700" onClick={() => setSelectedFile(null)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                      type="button"
                      className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-5 bg-rose-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}