import React from "react";
import ContactItem from "./ContactItem";

function ContactList(props) {
    const list = props.contacts.map((c) => {
        return (
            <ContactItem
                key={c.id}
                id={c.id}
                value={c.value}
                onEdit={(id) => props.onEdit(id, true)}
                onDelete={props.onDelete}
            />
        );

    });
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Contacts
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {list}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactList;