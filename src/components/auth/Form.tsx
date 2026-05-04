import type {
  FunctionComponent,
  PropsWithChildren,
  SubmitEventHandler
} from 'react'

interface Props extends PropsWithChildren {
  handleSubmit: SubmitEventHandler
}

const Form: FunctionComponent<Props> = ({ handleSubmit, children }) => (
  <form
    className='flex w-1/2 min-w-3xs flex-col gap-2 p-2'
    onSubmit={handleSubmit}
  >
    {children}
  </form>
)

export default Form
