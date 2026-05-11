import type {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  SubmitEventHandler
} from 'react'

interface Props extends PropsWithChildren {
  className?: string
  handleSubmit: SubmitEventHandler
  setEdit: Dispatch<SetStateAction<boolean>>
}

const Form: FunctionComponent<Props> = ({
  handleSubmit,
  setEdit,
  children,
  className
}) => (
  <form className={`flex flex-col gap-4 ${className}`} onSubmit={handleSubmit}>
    {children}
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
  </form>
)

export default Form
