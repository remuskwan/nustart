import { useEffect, useState } from "react";
import ContactForm from '../../components/contacts/ContactForm'
import ContactList from '../../components/contacts/ContactList'
import api from "../../util/api";

export default function ContactsTab({ editMode = false, user }) {

    const [contactStore, setContactStore] = useState({ contacts: [], currentId: 0 })

    useEffect(() => {
        async function getSize() {
            const size = await api.getContactSize()
            setContactStore({ contacts: user.contacts, currentId: size.data + 1 })
            //console.log(size)
        }
        getSize()
    }, [])

    function handleDelete(id) {
        const { contacts } = contactStore;
        const updatedNotes = contacts.filter((n) => {
            return n.id !== id;
        });

        setContactStore((oldNotesStore) => ({
            currentId: oldNotesStore.currentId,
            contacts: updatedNotes,
        }));
    }

    async function addContact(newContact) {
        await api.createContact(user.id, newContact)
        .then((response) => setContactStore({
            currentId: response.data.length + 1,
            contacts: response.data,
        }))
        .then(() => console.log(contactStore))
    }

    function handleAddEdit(note) {
        const { currentId, contacts } = contactStore;
        if (note.id === 0) {
            //add action
            if (note.value.trim() === "") return;

            note.id = currentId + 1;

            setContactStore({
                currentId: note.id,
                contacts: [...contacts, note],
            });
            console.log(note)
            addContact(note)

        } else {
            //edit action
            if (note.value.trim() === "") {
                //cancel edit
                return;
            } else {
                //find the note
                const updatedNotes = contacts.map((n) => {
                    if (n.id === note.id) {
                        note.editMode = false;
                        return note;
                    } else {
                        return n;
                    }
                });

                setContactStore((oldContactsStore) => ({
                    currentId: oldContactsStore.currentId,
                    contacts: updatedNotes,
                }));
            }
        }
    }

    const { contacts } = contactStore

    return (
        <div className="p-5 rounded-md shadow-sm -space-y-px">
            <div className="bg-white sm:rounded-lg">
                <div className="px-4 py-5 sm:p-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Contacts</h3>
                    <span className="text-sm text-gray-500" id="email-optional">
                        Help others find you! This will be visible to other users.
                    </span>
                    <br />
                    <div className="note-container">
                        {editMode 
                        ? <ContactForm onDone={handleAddEdit} />
                        : null
                        }
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
    )
}