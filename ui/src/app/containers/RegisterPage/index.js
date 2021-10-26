import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import ContactForm from '../../components/contacts/ContactForm'
import ContactList from '../../components/contacts/ContactList'

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

const notes = [
    { id: 1, value: 'aslfdkjas;dlfkaj;dfl' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RegisterPage() {
    const [selected, setSelected] = useState(accountType[0])
    const [faculty, setFaculty] = useState(faculties[0])
    const [notesStore, setNotesStore] = useState({ notes: [], currentId: 0 })

    function handleEdit(id, editMode) {
        const { notes } = notesStore;
        const updatedNotes = notes.map((n) => {
            if (n.id === id) {
                n.editMode = editMode;
            }
            return n;
        });

        setNotesStore((oldNotesStore) => ({
            currentId: oldNotesStore.currentId,
            notes: updatedNotes,
        }));
    } //end handleEdit

    function handleDelete(id) {
        const { notes } = notesStore;
        const updatedNotes = notes.filter((n) => {
            return n.id !== id;
        });

        setNotesStore((oldNotesStore) => ({
            currentId: oldNotesStore.currentId,
            notes: updatedNotes,
        }));

        console.log("###updatedNotes: ", updatedNotes);
    } //end handleDelete

    function handleAddEdit(note) {
        console.log("###in handleAddEdit ", note);
        const { currentId, notes } = notesStore;
        if (note.id === 0) {
            //add action
            if (note.value.trim() === "") return;

            note.id = currentId + 1;

            setNotesStore({
                currentId: note.id,
                notes: [...notes, note],
            });
        } else {
            //edit action
            if (note.value.trim() === "") {
                //cancel edit
                handleEdit(note.id, false);
                return;
            } else {
                //find the note
                const updatedNotes = notes.map((n) => {
                    if (n.id === note.id) {
                        note.editMode = false;
                        return note;
                    } else {
                        return n;
                    }
                });

                setNotesStore((oldNotesStore) => ({
                    currentId: oldNotesStore.currentId,
                    notes: updatedNotes,
                }));
            }
        }
    }

    const { notes } = notesStore;

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register a new account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <a href="/" className="font-medium text-rose-600 hover:text-rose-500">
                                Login
                            </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="mt-1 relative">
                                <Listbox.Label className="m-1 block text-sm font-medium text-gray-700">Position</Listbox.Label>
                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                                    <span className="block truncate">{selected.name}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>

                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {accountType.map((account) => (
                                            <Listbox.Option
                                                key={account.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'text-white bg-rose-600' : 'text-gray-900',
                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={account}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {account.name}
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
                                />
                            </div>
                            <div className="col-span-3 sm:col-span-2">
                                <div className="flex rounded-md shadow-sm">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-bl-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                        placeholder='e0000000'
                                    />
                                    <span className="inline-flex items-center px-3 rounded-br-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        @u.nus.edu
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">
                                    Confirm password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm password"
                                />
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
                                            notes={notes}
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