import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { uploadFile } from 'react-s3';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import InputText from '../../components/inputText';
import api from '../../util/api';
import CatSelectMenu from '../../components/catSelectMenu';
import UploadImage from '../../components/uploadImage';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';

const S3_BUCKET = 'nustart';
const REGION = 'ap-southeast-1';
const ACCESS_KEY = 'AKIARTYBCSQYJNUGQWLJ';
const SECRET_ACCESS_KEY = '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';

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}

export default function AddGuidePage() {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [category, setCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then(data => {
        createGuide(data.location)
      })
      .catch(error => setError(error))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (editorState.getCurrentContent().hasText()) {
      if (selectedFile === null) createGuide()
      else handleUpload(selectedFile)
      alert("Successfully created guide.")
    }
    else alert("Body cannot be empty.")
  }

  function createGuide(picLocation = "") {
    api.createGuide(category.id, {
      title: title,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      creator: user,
      pictureUrl: picLocation,
    })
      .then(() => history.goBack())
      .catch(error => setError(error))
  }

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => setError(error))
  }, [])

  useEffect(() => {
    api.getCategories()
      .then(response => {
        setCategories(response.data)
        setCategory(response.data[0])
      })
      .catch((error) => setError(error))
  }, [])

  if (error) return `Error: ${error.message}`

  return (
    user &&
    <div className="relative min-h-screen bg-gray-100">
      <NavBar disableButton={true} disableSearch={true} user={user} />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar user={user} />
          </div>
          <main className="lg:col-span-9 xl:col-span-10">
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">New guide</h3>
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
                      <div className="col-span-3 sm:col-span-1">
                        <CatSelectMenu options={categories} category={category} setCategory={setCategory} />
                      </div>
                      <div className="col-span-3">
                        <div>
                          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                            Body
                          </label>
                          <div className="mt-1">
                            <div className="shadow block w-full sm:text-sm rounded-md"
                              style={{ padding: '10px', minHeight: '400px' }}
                            >
                              <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                        {!selectedFile ?
                          <div >
                            <UploadImage handleFileInput={handleFileInput} accept=".jpg, .png, .gif" />
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