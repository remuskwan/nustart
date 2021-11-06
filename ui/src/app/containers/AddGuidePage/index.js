import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import InputText from '../../components/inputText';
import TextArea from '../../components/textArea';
import api from '../../util/api';

export default function AddGuidePage() {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault()
    createGuide()
    alert("Successfully created guide.")
  }

  function createGuide() {
    api.createGuide({
      title: title,
      content: content,
      creator: user,
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
      <NavBar disableButton={true} user={user}/>
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
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Add a new article！</h3>
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
                        <TextArea
                          name="content"
                          id="content"
                          label="content"
                          required={true}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="bg-rose-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
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