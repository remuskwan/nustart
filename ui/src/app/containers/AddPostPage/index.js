import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import { getUser } from '../../util/Common';
import InputText from '../../components/inputText';
import TextArea from '../../components/textArea';
// import { Editable, withReact, useSlate, Slate } from 'slate-react';

// const HOTKEYS = {
//   'mod+b': 'bold',
//   'mod+i': 'italic',
//   'mod+u': 'underline',
//   'mod+`': 'code',
// }

// const LIST_TYPES = ['numbered-list', 'bulleted-list']

export default function AddThreadPage() {
  const location = useLocation()
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [forum, setForum] = useState(location.state.forum)
  const [thread, setThread] = useState(location.state.thread)
  const [content, setContent] = useState("")
  const [error, setError] = useState(null);
  // const editor = useMemo(() => withHistory, input)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    createPost()
    // alert("Successfully added thread.")
  }

  function createPost() {
    axios
      .post(`http://localhost:8080/IS3106Assignment1-war/webresources/forums/${forum.id}/threads/${thread.id}/posts`, {
        content: content,
        creator: user
      })
      .then(() => history.goBack())
      .catch(error => setError(error))
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/IS3106Assignment1-war/webresources/users/${getUser()}`)
      .then(response => setUser(response.data))
      .catch((error) => (
        setError(error)
      ))
  }, [])

  useEffect(() => {
    console.log(forum.id)
    axios.get(`http://localhost:8080/IS3106Assignment1-war/webresources/forums/${forum.id}`)
      .then((response) =>
        setForum(response.data)
      )
      .catch((error) => (
        setError(error)
      ))
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-100">
      <NavBar buttonContent="thread" disableButton={true} />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar />
          </div>
          {forum &&
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
                          <TextArea
                            name="content"
                            id="content"
                            label="Post"
                            required={true}
                            autoFocus={true}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                          {/* <Slate editor={editor} value={content} onChange={(e) => setContent(e.target.value)}>
                            <Toolbar>
                              <MarkButton format="bold" icon="format_bold" />
                              <MarkButton format="italic" icon="format_italic" />
                              <MarkButton format="underline" icon="format_underlined" />
                              <MarkButton format="code" icon="code" />
                              <BlockButton format="heading-one" icon="looks_one" />
                              <BlockButton format="heading-two" icon="looks_two" />
                              <BlockButton format="block-quote" icon="format_quote" />
                              <BlockButton format="numbered-list" icon="format_list_numbered" />
                              <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                            </Toolbar>
                            <Editable
                              renderElement={renderElement}
                              renderLeaf={renderLeaf}
                              placeholder="Enter some rich text…"
                              spellCheck
                              autoFocus
                              onKeyDown={event => {
                                for (const hotkey in HOTKEYS) {
                                  if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                  }
                                }
                              }}
                            />

                          </Slate> */}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </main>
          }

        </div>
      </div>
    </div>
  )
}