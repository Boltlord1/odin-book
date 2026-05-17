import type { FunctionComponent } from 'react'

interface Props {
  available: boolean
  name: string
}

const Available: FunctionComponent<Props> = ({ name, available }) => (
  <>
    {name && (
      <p
        className={`rounded-r-lg border-l-6 px-4 py-1 ${available ? 'border-green-600 bg-green-300' : 'border-red-600 bg-red-300'}`}
        role='alert'
      >
        {name} is {available ? '' : 'not'} available
      </p>
    )}
  </>
)

export default Available
