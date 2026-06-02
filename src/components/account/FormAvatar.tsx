import type { FunctionComponent } from 'react'
import type { SelfData } from '../../types/data'
import type { EditProps } from '../../types/props'
import File from '../validate/File'
import Form from '../validate/Form'
import Buttons from './Form'

const AvatarForm: FunctionComponent<EditProps> = ({ setEdit, setSelf }) => {
  function success(json: SelfData) {
    setSelf(json)
    setEdit(false)
  }

  const footer = <Buttons setEdit={setEdit} />

  return (
    <Form
      app
      footer={footer}
      header='Avatar'
      method='put'
      path='/user'
      success={success}
    >
      <File accept='image/png, image/jpeg' label='' name='avatar' required />
    </Form>
  )
}

export default AvatarForm
