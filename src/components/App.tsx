import { type FunctionComponent, useEffect, useRef, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import { getTheme } from '../lib/preference'
import type { AppContext, ConfirmOptions } from '../types/app'
import type { SelfData } from '../types/data'
import Laptop from './Laptop'
import Mobile from './Mobile'

const App: FunctionComponent = () => {
  const data = useLoaderData<SelfData>()
  const [self, setSelf] = useState(data)

  const theme = getTheme()

  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (options && dialog.current) {
      dialog.current.showModal()
    }
  }, [options])

  const context: AppContext = { self, setSelf, setOptions, theme }

  return (
    <div className='relative flex flex-1 flex-col gap-4 p-4 sm:w-160 sm:self-center'>
      <Mobile />
      <Laptop />
      <div className='lg:hidden' />
      <Outlet context={context} />
      {options && (
        <dialog className='px-6 py-2' closedby='any' ref={dialog}>
          <h2>{options.message}</h2>
          <p>This action cannot be reversed</p>
          <button
            onClick={() => {
              dialog.current?.close()
              setOptions(null)
            }}
            type='button'
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await options.confirm()
              dialog.current?.close()
              setOptions(null)
            }}
            type='button'
          >
            Delete
          </button>
        </dialog>
      )}
    </div>
  )
}

export default App
