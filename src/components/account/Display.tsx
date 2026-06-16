import type { FunctionComponent } from 'react'
import type { DisplayProps } from '../../types/props'

const Display: FunctionComponent<DisplayProps> = ({
  setEdit,
  children,
  className
}) => (
  <div className={className}>
    {children}
    <button
      className='self-start justify-self-start rounded-xl bg-gray-100 px-4 py-1 text-base dark:bg-zinc-700'
      onClick={() => setEdit(true)}
      type='button'
    >
      Edit
    </button>
  </div>
)

export default Display
