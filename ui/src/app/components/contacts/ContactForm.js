import React, { useRef, useState, useEffect } from "react";

function ContactForm({
  editMode = false,
  value = "",
  id = 0,
  onDone,
}) {
  const textboxRef = useRef();
  const [text, setText] = useState(value);

  // useEffect(() => {
  //   textboxRef.current.focus();
  //   textboxRef.current.select();
  // }, []);

  function resetState() {
    setText(value);
  }

  function renderAddOrEditBtn() {
    let buttonText = "Add";

    if (editMode) {
      buttonText = "Confirm Edit";
    }

    return (
      <button
        type="submit"
        className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={() => {
          onDone({
            id: id,
            value: text,
          });
          resetState();
        }}
      >
        Add
      </button>
    );
  } //end renderAddOrEditBtn

  const addOrEditBtn = renderAddOrEditBtn();

  return (
    <div>
      <div className="mt-5 sm:flex sm:items-center">
        <div className="w-full sm:max-w-xs">
        <label htmlFor="email" className="sr-only">
          Contact
        </label>
          <input
            ref={textboxRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="email"
            name="contact"
            id="contact"
            className="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="@telegramhandle"
          />
        </div>
        <button
          type="button"
          className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            onDone({
              id: id,
              value: text,
            });
            resetState();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ContactForm;