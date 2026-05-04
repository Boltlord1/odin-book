import type {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  SubmitEventHandler
} from 'react'

interface Props extends PropsWithChildren {
  handleSubmit: SubmitEventHandler
  setEdit: Dispatch<SetStateAction<boolean>>
}

const Form: FunctionComponent<Props> = ({
  handleSubmit,
  setEdit,
  children
}) => (
  <form onSubmit={handleSubmit}>
    <button onClick={() => setEdit(false)} type='button'>
      Cancel
    </button>
    <button type='submit'>Save</button>
    {children}
  </form>
)

export default Form
