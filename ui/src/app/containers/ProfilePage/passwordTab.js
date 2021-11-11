import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import InputText from "../../components/inputText"
import api from "../../util/api"

export default function PasswordTab({ user }) {

    const [password, setPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        async function getLoggedInUser() {
            await api.getUser(user.id)
                .then(response => setPassword(response.data.password))
                .then(() => console.log(password))
        }
        getLoggedInUser()
    }, [user.id])

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (password === currentPassword) {
            if (newPassword.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")) {
                if (newPassword === confirmPassword) {
                    //console.log(newPassword)
                    changePassword()
                } else {
                    alert("Passwords do not match!")
                }
            } else {
                setError("Passwords must be minimum eight characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.")
            }
        } else {
            alert("Wrong current password!")
        }
    }

    async function changePassword() {
        user.password = newPassword
        await api.editUser(user.id, user)
            .then(response => console.log(response.data))
            .then(() => setMessage("Your password has been updated."))
            .then(() => console.log(message))
    }

    return (
        user &&
        <div>
            <div className="pt-3 space-y-6 sm:pt-5 sm:space-y-5">
                <form onSubmit={handleSubmit}>
                    <div className="p-5 space-y-3 sm:space-y-5">
                        {message &&
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800">Success</h3>
                                        <div className="mt-2 text-sm text-green-700">
                                            {message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {error &&
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            {error}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">

                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Current Password
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2 max-w-lg block w-full shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <InputText
                                    type="password"
                                    name="password"
                                    id="password"
                                    required={true}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                New Password
                            </label>
                            <div className="col-span-2 shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <InputText
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    required={true}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Confirm Password
                            </label>
                            <div className="col-span-2 shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm rounded-md">
                                <InputText
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required={true}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                    onClick={() => window.location.reload()}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}