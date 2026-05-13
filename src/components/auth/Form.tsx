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
    className='flex w-2xs flex-col gap-2 self-center p-2'
    noValidate
    onSubmit={handleSubmit}
  >
    {children}
  </form>
)

export default Form
