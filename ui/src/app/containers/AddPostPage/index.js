import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import { getUser } from '../../util/Common';
import TextArea from '../../components/textArea';
import RichTextArea from '../../components/richTextArea';
import api from '../../util/api';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import draftToHtml from 'draftjs-to-html';

export default function AddPostPage() {
  const history = useHistory()
  const { forumId, threadId } = useParams()
  const [user, setUser] = useState(null)
  const [content, setContent] = useState("")
  const [error, setError] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleSubmit = (evt) => {
    evt.preventDefault()
    createPost()
    alert("Successfully added post.")
  }

  function createPost() {
    console.log(editorState.getCurrentContent());
    api.createPost(forumId, threadId, {
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      creator: user
    })
      .then(() => history.goBack())
      .catch(error => setError(error))
  }

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => (
        setError(error)
      ))
    // setEditorState(() => EditorState.createEmpty())
  }, [])


  return (
    user &&
    <div className="relative min-h-screen bg-gray-100">
      <NavBar disableButton={true} user={user} />
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
                      <h3 className="text-lg leading-6 font-medium text-gray-900">New Post</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3">
                        <div>
                          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                            Post
                          </label>

                          <div className='mt-1'>
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