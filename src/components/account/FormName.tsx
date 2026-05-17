import type { FunctionComponent } from 'react'
import type { SelfData } from '../../types/data'
import type { EditProps } from '../../types/props'
import EditInput from '../validate/Edit'
import Form from '../validate/Form'
import Buttons from './Form'

interface Props extends EditProps {
  displayPlaceholder: string
  userPlaceholder: string
}

const NameForm: FunctionComponent<Props> = ({
  setEdit,
  setSelf,
  userPlaceholder,
  displayPlaceholder
}) => {
  function success(json: SelfData) {
    setSelf(json)
    setEdit(false)
  }

  const footer = <Buttons setEdit={setEdit} />

  return (
    <Form app footer={footer} method='put' path='/user' success={success}>
      <EditInput
        displayPlaceholder={displayPlaceholder}
        userPlaceholder={userPlaceholder}
      />
    </Form>
  )
}

export default NameForm
