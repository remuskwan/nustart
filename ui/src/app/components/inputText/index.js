export default function InputText(
  {
    placeholder="", 
    required=false, 
    autoFocus=false, 
    className="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md",
    ...props
  }) {
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
          className={className}
          placeholder={placeholder}
          autoComplete={props.autoComplete}
          autoFocus={autoFocus}
          required={required}
          aria-invalid="true"
          aria-describedby="input-error"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  )
}