import React from "react";

function ContactItem(props) {
  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="sm:flex sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{props.value}</h3>
        </div>
        <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 font-medium rounded-md text-rose-600 hover:text-rose-900"
            onClick={(e) => props.onDelete(props.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>

  );
}

export default ContactItem;