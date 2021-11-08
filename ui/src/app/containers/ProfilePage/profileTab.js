import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {
    ChevronRightIcon,
    CheckIcon,
    SelectorIcon,
    StarIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import {
    CalendarIcon,
    HomeIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    AnnotationIcon,
    LibraryIcon,
} from '@heroicons/react/outline'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/navBar'
import ContactForm from '../../components/contacts/ContactForm'
import ContactList from '../../components/contacts/ContactList'
import NewButton from '../../components/newButton'
import api from '../../util/api'
import { getUser } from '../../util/Common'
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
    { id: 9, name: 'admin' },
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

const defaultUser = {
    "accountStatus": "ACTIVE",
    "accountType": "ADMIN",
    "contacts": [],
    "created": "2021-11-03T16:00:00Z[UTC]",
    "deleted": false,
    "email": "admin01@mail.com",
    "favoriteGuides": [],
    "favoritePosts": [],
    "id": 1,
    "password": "asdf",
    "username": "Admin01",
    "yr": 0
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileTab() {
    const [user, setUser] = useState(defaultUser)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState("")
    const [year, setYear] = useState(years[0])
    const [faculty, setFaculty] = useState(faculties[0])
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const history = useHistory()

    useEffect(() => {
        async function getLogged() {
            const u = await api.getUser()
            //console.log(u.data)
            getLoggedInUser(u.data)
        }
        getLogged()
    }, [])

    function getLoggedInUser(u) {
        if (u.accountType === "STUDENT") {
            setCourse(u.course)
            const y = years.filter((y) => y.name === u.yr.toString())[0]
            setYear(y)
            //console.log(y)
            //console.log(year)
            const f = faculties.filter((f) => f.name === u.faculty)[0]
            //console.log(faculties.filter((f) => f.name === u.faculty)[0])
            setFaculty(f)
            setEmail(u.email)
            setName(u.username)
        } else if (u.accountType === "STAFF") {
            //console.log(year)
            const f = faculties.filter((f) => f.name === u.faculty)[0]
            //console.log(faculties.filter((f) => f.name === u.faculty)[0])
            setFaculty(f)
            setEmail(u.email)
            setName(u.username)
        } else {
            setEmail(u.email)
            setName(u.username)
        }
        setUser(u)

        setSelectedFile(u.profilePicture)
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault()
        updateProfile()
    }

    function updateProfile() {
        
        api.editUser(user.id, {
            email: email,
            profilePicture: user.profilePicture,
            username: name,
            faculty: faculty.name,
            yr: year.name,
            course: course,
        })//.then(response => console.log(response.data))
    }

    return (
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div className="p-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="given-name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            className="max-w-lg block w-full shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Email
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="max-w-lg block w-full shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
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
                        {/* <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              className="max-w-lg block focus:ring-rose-500 focus:border-rose-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div> */}
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
                                onChange={(e) => { setCourse(e.target.value) }}
                                className="max-w-lg block w-full shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    : null
                }

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 sm:border-b">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Profile Picture
                    </label>
                    <div className="mt-1 flex items-center">
                        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            {isFilePicked
                                ?
                                <img
                                    className="mx-auto h-12 w-auto"
                                    src={selectedFile}
                                    alt=":)"
                                />
                                :
                                <img
                                    className="mx-auto h-12 w-auto"
                                    src={user.profilePicture}
                                    alt=":)"
                                />
                            }
                        </span>
                        <div className="p-3 flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-grey-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                            >
                                <span>Change</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={changeHandler} />
                            </label>
                            <button
                                type="button"
                                className="ml-3 bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-rose-600 hover:text-blue-gray-700 focus:outline-none focus:border-blue-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-gray-50 focus:ring-blue-500"
                                //onClick={() => console.log('remove picture')}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
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
                            onClick={handleSubmit}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}