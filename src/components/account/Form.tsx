import type {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction
} from 'react'

interface Props extends PropsWithChildren {
  setEdit: Dispatch<SetStateAction<boolean>>
}

const Buttons: FunctionComponent<Props> = ({ setEdit }) => (
  <div className='flex gap-4'>
    <button
      className='rounded-xl bg-gray-100 px-4 py-1 text-base'
      onClick={() => setEdit(false)}
      type='button'
    >
      Cancel
    </button>
    <button
      className='rounded-xl bg-gray-100 px-4 py-1 text-base'
      type='submit'
    >
      Save
    </button>
  </div>
)

export default Buttons
