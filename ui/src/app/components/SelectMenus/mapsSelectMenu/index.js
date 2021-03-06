import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MapSelectMenu({ options, map, setMap }) {
  console.log(map)
  return (
    (options.length && map) ?
      <Listbox value={map} onChange={setMap}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">Maps</Listbox.Label>
            <div className="relative">
              <Listbox.Button className="mt-1 bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                <span className="block truncate">{map.title.charAt(0) + map.title.slice(1)}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {!options.length ?
                    <Listbox.Option
                      key="No sort types"
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-rose-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={null}
                    >
                      No categories
                    </Listbox.Option>
                    : options.map((map) => (
                      <Link to={`/campus/${map.id}`}>
                      <Listbox.Option
                        key={map.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-rose-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={map}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                              {map.title}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-rose-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                      </Link>
                    ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      : <div>No maps</div>
  )
}
