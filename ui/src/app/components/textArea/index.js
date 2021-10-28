export default function TextArea(
  { placeholder = '',
    required = false,
    autoFocus = false,
    rows = 3,
    helpText = '',
    ...props }
) {
  return (
    <div>
      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className="mt-1">
        <textarea
          id={props.id}
          name={props.name}
          rows={rows}
          placeholder={placeholder}
          required
          autoFocus={autoFocus}
          className="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">{helpText}</p>

    </div>
  )
}