import { ExclamationCircleIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InputTextError(
  {
    placeholder = "",
    required = false,
    autoFocus = false,
    ...props
  }
) {
  return (
    <div>
      <label htmlFor="input" className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          className={classNames(
            !props.error
              ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
              : "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
          )}
          placeholder={placeholder}
          autoComplete={props.autoComplete}
          autoFocus={autoFocus}
          required={required}
          aria-invalid="true"
          aria-describedby="input-error"
          value={props.value}
          onChange={props.onChange}
        />
        {props.error &&
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        }
      </div>
      {props.error &&
        <p className="mt-2 text-sm text-red-600" id="input-error">
          {props.error.message}
        </p>
      }
    </div>
  )
}