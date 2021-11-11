import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import GuideOptions from '../../components/Guides/guideOptions';
import {
  CalendarIcon,
  ChatAltIcon,
} from '@heroicons/react/solid'

import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';

import api from '../../util/api';
import CommentsSection from '../../components/commentsSection';

export default function GuideDetailsPage() {
  const { categoryId, guideId } = useParams()
  const [user, setUser] = useState(null)
  const [category, setCategory] = useState(null)
  const [guide, setGuide] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => setError(error))
  }, [])

  useEffect(() => {
    api.getGuide(guideId)
      .then(response => {
        setGuide(response.data)
        setTitle(response.data.title)
        setContent(response.data.content)
        setComments(response.data.comments)
      })
      .catch((error) => setError(error))
  }, [guideId])

  useEffect(() => {
    api.getCategory(categoryId)
      .then(response => {
        setCategory(response.data)
      })
      .catch((error) => setError(error))
  }, [categoryId])

  return (
    (user && guide && category) &&
    <div className="relative min-h-screen bg-gray-100">
      <NavBar disableButton={true} disableSearch={true} user={user} />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <SideBar user={user} />
          </div>
          <main className="lg:col-span-9 xl:col-span-10">
            <div className="py-8 xl:py-10">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3">
                <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
                  <div>
                    <div>
                      <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                          <p className="mt-2 text-sm text-gray-500">
                            By
                            <Link to={`/profile/${guide.creator.id}`} className="font-medium text-gray-900" >
                              {' ' + guide.creator.username}
                            </Link>
                          </p>
                        </div>
                        <div className="mt-4 flex space-x-3 md:mt-0">
                          {(guide.creator.id === user.id || user.accountType === "ADMIN") &&
                            <GuideOptions
                              categoryId={categoryId}
                              setCategory={setCategory}
                              guide={guide}
                              setGuide={setGuide}
                            />}
                        </div>
                      </div>
                      <aside className="mt-8 xl:hidden">
                        <h2 className="sr-only">Details</h2>
                        <div className="space-y-5">
                          <div className="flex items-center space-x-2">
                            <ChatAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="text-gray-900 text-sm font-medium">{guide.comments.length} comments</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="text-gray-900 text-sm font-medium">
                              Created on {moment(guide.dateCreated.slice(0, -5)).format("MMM Do, YYYY")}
                            </span>
                          </div>
                        </div>
                        <div className="mt-6 border-t border-b border-gray-200 py-6 space-y-8">
                          <div>
                            <h2 className="text-sm font-medium text-gray-500">Category</h2>
                            <ul className="mt-2 leading-8">
                              <li className="inline">
                                <Link
                                  to={`/categories/${categoryId}/guides`}
                                  className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
                                  <div className="absolute flex-shrink-0 flex items-center justify-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                                  </div>
                                  <div className="ml-3.5 text-sm font-medium text-gray-900">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</div>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </aside>
                      <img
                        src={guide.pictureUrl}
                        alt=""
                      />
                      <div className="py-3 xl:pt-6 xl:pb-0">
                        <h2 className="sr-only">Content</h2>
                        <div className="prose max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                      </div>

                      <CommentsSection
                        user={user}
                        comments={comments}
                        guideId={guideId}
                        setGuide={setGuide}
                        setComments={setComments} />
                    </div>
                  </div>
                </div>
                <aside className="hidden xl:block xl:pl-8">
                  <h2 className="sr-only">Details</h2>
                  <div className="space-y-5">
                    <div className="flex items-center space-x-2">
                      <ChatAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="text-gray-900 text-sm font-medium">{guide.comments.length} comments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="text-gray-900 text-sm font-medium">
                        Created on {moment(guide.dateCreated.slice(0, -5)).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-gray-200 py-6 space-y-8">
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">Category</h2>
                      <ul className="mt-2 leading-8">
                        <li className="inline">
                          <Link
                            to={`/categories/${categoryId}/guides`}
                            className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
                            <div className="absolute flex-shrink-0 flex items-center justify-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                            </div>
                            <div className="ml-3.5 text-sm font-medium text-gray-900">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}