import { Fragment, useState , useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import InputText from '../../inputText'
import api from '../../../util/api'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState ,convertToRaw} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const htmlToDraftBlocks = (html) => {
  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState = EditorState.createWithContent(contentState)
  return editorState
}

export default function EditGuideModal({ categoryId, guide, setGuide, open, setOpen, setNotifTitle, triggerNotification }) {
  const [editorState, setEditorState] = useState()
  const [title, setTitle] = useState(guide.title)
  const [error, setError] = useState(null);


  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (title !== '' && editorState.getCurrentContent().hasText()) {
      editGuide()
      setNotifTitle("saved guide")
      triggerNotification()
      setOpen(false)
      window.location.reload()
    }
    else if(title === ''){
      alert("Title cannot be empty")
    }
    else{
      alert("Content cannot be empty")
    }
  }

  function editGuide() {
    guide.title = title
    guide.content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    api.editGuide(categoryId, guide)
      .then((response) =>{
        setGuide(response.data)
      })
      .catch(error => setError(error))
  }

  useEffect(() => {
    const editorState = htmlToDraftBlocks(guide.content)
    setEditorState(() => editorState)
  }, [guide.content])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => {
        setTitle(guide.title)
        setOpen(false)
      }}>
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
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Edit guide
                  </Dialog.Title>
                  <div className="mt-2 gap-6 text-left">
                    <InputText
                      type="text"
                      name="title"
                      id="title"
                      label="Title"
                      placeholder="Enter a forum title"
                      autoComplete="title"
                      required={true}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mt-2 gap-6 text-left">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Guide
                    </label>
                    <div>
                      <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={setEditorState}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:text-sm"
                  >
                    Save
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