export default function uploadProfileImage({ accept, handleProfileInput }) {
    return (
        <div className="mt-1 flex justify-center px-6 pb-6">

            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <label
                        htmlFor="profile-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500"
                    >
                        <span className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-rose-600 hover:bg-gray-50 ">Change</span>
                        <input id="profile-upload" name="profile-upload" type="file" accept={accept} className="sr-only" onChange={handleProfileInput} />
                    </label>
                </div>
            </div>
        </div>
    )
}