import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { XCircleIcon } from '@heroicons/react/solid';
import NavBar from "../../components/navBar";
import SideBar from '../../components/sideBar';
import InputText from '../../components/inputText';
import InputTextError from '../../components/inputTextError';
import api from '../../util/api';

export default function AddAdminPage() {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (password !== confirmPassword) {
      setError(new Error("Passwords do not match."))
    } else if (!password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")) {
      setError(new Error("Passwords must be minimum eight characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."))
    } else {
      createAdmin()
    }
  }

  function createAdmin() {
    api.register({
      email: email,
      password: password,
      username: username,
      accountType: 'ADMIN',
      accountStatus: 'ACTIVE',
      course: 'default',
      coverImage: 'default',
      faculty: 'default',
      yr: 'default',
    })
      .then(() => history.goBack())
      .catch(error => {
        if (!error.response) setSubmitError(new Error("Failed to connect to server"))
        if (error.response.status === 404) setSubmitError(new Error("Account already exists"))
        else setSubmitError(new Error("Something went wrong. Please try again later."))
      })
  }

  useEffect(() => {
    api.getUser()
      .then(response => setUser(response.data))
      .catch((error) => (
        setError(error)
      ))
  }, [])

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
                      <h3 className="text-lg leading-6 font-medium text-gray-900">New Admin</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {submitError &&
                        <div className="py-4 col-span-3">
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">There were errors when attempting to create account</h3>
                                <div className="mt-2 text-sm text-red-700">
                                  {submitError.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      <div className="col-span-3 sm:col-span-2">
                        <InputText
                          label="Username"
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          value={username}
                          autoFocus={true}
                          required={true}
                          onChange={e => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <InputText
                          label="Email address"
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          autoComplete="email"
                          required={true}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <InputTextError
                          label="Password"
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required={true}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          error={error}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <InputTextError
                          label="Confirm password"
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="current-password"
                          required={true}
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          error={error}
                        />
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