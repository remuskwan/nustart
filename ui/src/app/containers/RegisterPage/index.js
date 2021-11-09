import { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationCircleIcon, SelectorIcon, XCircleIcon } from '@heroicons/react/solid'
import ContactForm from '../../components/contacts/ContactForm'
import ContactList from '../../components/contacts/ContactList'
import api from '../../util/api'
import { setUserSession } from '../../util/Common'

const accountType = [
    { id: 1, name: 'Student' },
    { id: 2, name: 'Staff' },
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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RegisterPage() {
    const history = useHistory()
    const [position, setPosition] = useState(accountType[0])
    const [faculty, setFaculty] = useState(faculties[0])
    const [year, setYear] = useState(years[0])
    const [course, setCourse] = useState("")
    const [contactList, setContactsList] = useState({ contacts: [], currentId: 0 })
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const [submitError, setSubmitError] = useState(null)

    useEffect(async () => {
        const size = await api.getContactSize()
        setContactsList({ contacts: [], currentId: size.data + 1 })
    }, [])

    function handleEdit(id, editMode) {
        const { contacts } = contactList;
        const updatedContacts = contacts.map((n) => {
            if (n.id === id) {
                n.editMode = editMode;
            }
            return n;
        });

        setContactsList((oldContactList) => ({
            currentId: oldContactList.currentId,
            contacts: updatedContacts,
        }));
    } //end handleEdit

    function handleDelete(id) {
        const { contacts } = contactList;
        const updatedContacts = contacts.filter((n) => {
            return n.id !== id;
        });

        setContactsList((oldContactList) => ({
            currentId: oldContactList.currentId,
            contacts: updatedContacts,
        }));

    } //end handleDelete

    function handleAddEdit(contact) {
        const { currentId, contacts } = contactList;
        if (contact.id === 0) {
            //add action
            if (contact.value.trim() === "") return;

            contact.id = currentId + 1;

            setContactsList({
                currentId: contact.id,
                contacts: [...contacts, contact],
            });
        } else {
            //edit action
            if (contact.value.trim() === "") {
                //cancel edit
                handleEdit(contact.id, false);
                return;
            } else {
                //find the note
                const updatedContacts = contacts.map((n) => {
                    if (n.id === contact.id) {
                        contact.editMode = false;
                        return contact;
                    } else {
                        return n;
                    }
                });

                setContactsList((oldContactList) => ({
                    currentId: oldContactList.currentId,
                    contacts: updatedContacts,
                }));
            }
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        if (password !== confirmPassword) {
            setError(new Error("Passwords do not match."))
        } else if (!password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")) {
            setError(new Error("Passwords must be minimum eight characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."))
        } else {
            register()
        }
    }

    function register() {
        api.register({
            email: email,
            password: password,
            username: `${firstName} ${lastName}`,
            accountType: position.id === 1 ? 'STUDENT' : 'STAFF',
            accountStatus: position.id === 1 ? 'ACTIVE' : 'UNAPPROVED',
            faculty: faculty.name,
            yr: year.name,
            course: course,
            contacts: contactList.contacts
        })
            .then((response) => {
                console.log(response.data)
                setUserSession({ userId: response.data })
            })
            .then(() => history.push("/"))
            .catch(error => {
                if (!error.response) setSubmitError(new Error("Failed to connect to server"))
                if (error.response.status === 404) setSubmitError(new Error("Account already exists"))
                else setSubmitError(new Error("Something went wrong. Please try again later."))
            })
    }
    console.log(error)
    const { contacts } = contactList;

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://nustart.s3.ap-southeast-1.amazonaws.com/logo.png"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register a new account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <Link to="/login" className="font-medium text-rose-600 hover:text-rose-500">
                                log in
                            </Link>
                        </p>
                    </div>
                    {submitError &&
                        <div className="py-4">
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
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <Listbox value={position} onChange={setPosition}>
                            <div className="mt-1 relative">
                                <Listbox.Label className="m-1 block text-sm font-medium text-gray-700">Position</Listbox.Label>
                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                                    <span className="block truncate">{position.name}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>

                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {accountType.map((type) => (
                                            <Listbox.Option
                                                key={type.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'text-white bg-rose-600' : 'text-gray-900',
                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={type}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {type.name}
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
                        <Listbox value={faculty} onChange={setFaculty}>
                            <div className="mt-1 relative">
                                <Listbox.Label className="m-1 block text-sm font-medium text-gray-700">Faculty</Listbox.Label>
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

                        {position.id === 1
                            ? <div>
                                <Listbox value={year} onChange={setYear}>
                                    <div className="mt-1 relative">
                                        <Listbox.Label className="m-1 block text-sm font-medium text-gray-700">Year</Listbox.Label>
                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                                            <span className="block truncate">{year.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>

                                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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

                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="course" className="sr-only">
                                            Course
                                        </label>
                                        <input
                                            id="course"
                                            name="course"
                                            required
                                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                            placeholder="Course"
                                            value={course}
                                            onChange={(e) => setCourse(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            : null
                        }


                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="first-name" className="sr-only">
                                    First name
                                </label>
                                <input
                                    id="first-name"
                                    name="firstName"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="sr-only">
                                    Last name
                                </label>
                                <input
                                    id="last-name"
                                    name="lastName"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="col-span-3 sm:col-span-2">
                                <div className="flex rounded-md shadow-sm">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                        placeholder='e0000000'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {/* <span className="inline-flex items-center px-3 rounded-br-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        @u.nus.edu
                                    </span> */}
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className={classNames(
                                            !error
                                                ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                                : "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                                        )}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {error &&
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">
                                    Confirm password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className={classNames(
                                            !error
                                                ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                                : "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                                        )}
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {error &&
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                        </div>
                                    }
                                </div>
                                {error &&
                                    <p className="mt-2 text-sm text-red-600" id="input-error">
                                        {error.message}
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add contacts</h3>
                                    <span className="text-sm text-gray-500" id="email-optional">
                                        Optional
                                    </span>
                                    <br />
                                    <div className="note-container">
                                        <ContactForm onDone={handleAddEdit} />
                                        <br />
                                        <ContactList
                                            contacts={contacts}
                                            onDelete={handleDelete}
                                            onDone={handleAddEdit}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}