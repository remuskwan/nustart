import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import { CalendarIcon } from '@heroicons/react/solid';
import InputText from '../../components/inputText';
import TextArea from '../../components/textArea';
import Comment from '../../components/comment';
import CommentsList from '../../components/commentsList';
import CommentsSection from '../../components/commentsSection';
import api from '../../util/api';

export default function GuideDeatailsPage() {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [comment, setComment] = useState("")
  const [error, setError] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault()
    createComment()
    alert("Successfully comment.")
  }

  function createComment() {
    api.createComment({
      comment: comment,
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
      <NavBar disableButton={true} user={user} />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar user={user} />
          </div>
          <main className="flex-1">
            <div className="py-8 xl:py-10">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3">
                <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
                  <div>
                    <div>
                      <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Title</h1> {/* needs to change*/}
                        </div>
                      </div>
                      <aside className="mt-8 xl:hidden">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="text-gray-900 text-sm font-medium">
                            Created on <time dateTime="2020-12-02">Dec 2, 2020</time>{/*time needs to change*/}
                          </span>
                        </div>
                        <div>
                          <h2 className="text-sm font-medium text-gray-500">Creator</h2>
                          <ul role="list" className="mt-3 space-y-3">
                            <li className="flex justify-start">
                              <a href="#" className="flex items-center space-x-3">
                                <div className="text-sm font-medium text-gray-900">Name</div>{/* needs to change*/}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </aside>
                      <div className="py-3 xl:pt-6 xl:pb-0">
                        <div className="prose max-w-none">
                          <p>
                            Content  {/* needs to change*/}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </main>
        </div>
      </div>
    </div>



  )
}