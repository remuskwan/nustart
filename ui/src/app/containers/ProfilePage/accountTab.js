import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import InputText from '../../components/inputText'
import { uploadFile } from 'react-s3'
import UploadImage from '../../components/uploadImage'
import {
    ChevronRightIcon,
    CheckIcon,
    SelectorIcon,
    StarIcon,
    UserCircleIcon,
} from '@heroicons/react/solid'
import {
    CalendarIcon,
    HomeIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    AnnotationIcon,
    LibraryIcon,
    CheckCircleIcon,
} from '@heroicons/react/outline'
import api from '../../util/api'
import { useHistory } from 'react-router'

const years = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: 'Part-time' },
    { id: 7, name: 'Graduate' },
    { id: 8, name: 'PhD' },
]

const faculties = [
    { id: 1, name: 'Arts & Social Sciences' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'Computing' },
    { id: 4, name: 'Continuing and Lifelong Education' },
    { id: 5, name: 'Dentistry' },
    { id: 6, name: 'Design & Environment' },
    { id: 7, name: 'Duke-NUS' },
    { id: 8, name: 'Engineering' },
    { id: 9, name: 'Integrative Sciences & Engineering' },
    { id: 10, name: 'Law' },
    { id: 11, name: 'Medicine' },
    { id: 12, name: 'Music' },
    { id: 13, name: 'Public Health' },
    { id: 14, name: 'Public Policy' },
    { id: 15, name: 'Science' },
    { id: 16, name: 'University Scholars Program' },
    { id: 17, name: 'Yale-NUS' },
]

export default function AccountTab() {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState("")
    const [year, setYear] = useState(years[0])
    const [faculty, setFaculty] = useState(faculties[0])
    const [message, setMessage] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [error, setError] = useState(null)

    const history = useHistory()

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

    useEffect(() => {
        async function getLogged() {
            const u = await api.getUser()
            setEmail(u.data.email)
            setName(u.data.username)
            setProfilePic(u.data.profilePicture)
            if (u.data.accountType === "STUDENT") {
                setCourse(u.data.course)
                const y = years.filter((y) => y.name === u.data.yr.toString())[0]
                setYear(y)
                // console.log(year)
                const f = faculties.filter((f) => f.name === u.data.faculty)[0]
                //console.log(faculties.filter((f) => f.name === u.faculty)[0])
                setFaculty(f)

            } else if (u.data.accountType === "STAFF") {
                const f = faculties.filter((f) => f.name === u.data.faculty)[0]
                setFaculty(f)
            }
            setUser(u.data)
        }
        getLogged()
    }, [])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(selectedFile)
        if (selectedFile === null) {
            updateProfile()
        } else {
            handleUpload(selectedFile)
        }

    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                updateProfile(data.location)
            })
            .catch(error => setError(error))
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
        // setFiles([(prev) => prev].push(e.target.files[0]))
    }

    function updateProfile(picLocation = '') {
        if (user.accountType === 'STAFF') {
            user.faculty = faculty.name
        } else if (user.accountType === 'STUDENT') {
            user.course = course
            user.yr = year.name
            user.faculty = faculty.name
        }
        user.email = email
        user.username = name
        user.profilePicture = picLocation
        api.editUser(user.id, user)
            .then(response => setUser(response.data))
            .then(() => window.location.reload())
    }

    return (
        user &&
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
                                    <h3 className="text-sm font-medium text-green-800">Your profile was updated successfully</h3>
                                    <div className="mt-2 text-sm text-green-700">
                                        {message.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">

                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 max-w-lg block w-full shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                            <InputText
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="given-name"
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Email
                        </label>
                        <div className="col-span-2 shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                            <InputText
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-span-3">
                        <label className="block sm:border-t sm:border-gray-200 sm:pt-5 text-sm font-medium text-gray-700">Profile picture</label>
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

                    {user.accountType === "STUDENT"
                        ?
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Year
                            </label>
                            <Listbox value={year} onChange={setYear}>
                                <div className="mt-1 relative">
                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                                        <span className="block truncate">{year.name}</span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <Listbox.Options className="absolute z-10 mt-1 max-w-lg block w-full bg-white shadow-sm max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:max-w-xs sm:text-sm">
                                            {years.map((y) => (
                                                <Listbox.Option
                                                    key={y.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-rose-600' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-8 pr-4'
                                                        )
                                                    }
                                                    value={y}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                {y.name}
                                                            </span>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-rose-600',
                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>

                        </div>
                        : null
                    }
                    {user.accountType !== "ADMIN"
                        ? <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Faculty
                            </label>
                            <Listbox value={faculty} onChange={setFaculty}>
                                <div className="mt-3 relative">
                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                                        <span className="block truncate">{faculty.name}</span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {faculties.map((faculty) => (
                                                <Listbox.Option
                                                    key={faculty.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-rose-600' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-8 pr-4'
                                                        )
                                                    }
                                                    value={faculty}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                {faculty.name}
                                                            </span>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-rose-600',
                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        : null
                    }

                    {user.accountType === "STUDENT"
                        ? <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="course" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Course
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="course"
                                    id="course"
                                    autoComplete="course"
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    className="max-w-lg block w-full shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        : null
                    }

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                onClick={() => history.goBack()}
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
    )
}