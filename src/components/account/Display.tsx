import type { FunctionComponent } from 'react'
import type { DisplayProps } from '../../types/props'

const Display: FunctionComponent<DisplayProps> = ({ setEdit, children }) => (
  <div>
    <button onClick={() => setEdit(true)} type='button'>
      Edit
    </button>
    {children}
  </div>
)

export default Display
