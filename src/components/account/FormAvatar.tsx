import type { FunctionComponent, SubmitEventHandler } from 'react'
import useFiles from '../../hooks/files'
import { formOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import type { SelfData } from '../../types/data'
import type { EditProps } from '../../types/props'
import File from '../general/File'
import Form from './Form'

const Avatar: FunctionComponent<EditProps> = ({ setEdit, setSelf }) => {
  const [file, changeFile] = useFiles()

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()
    const response = await fetch(
      `${backendUrl}/user/avatar`,
      formOptions(event.target, 'put')
    )

    if (response.ok) {
      const json: SelfData = await response.json()
      setSelf(json)
      setEdit(false)
      return
    }
  }

  return (
    <Form handleSubmit={handleSubmit} setEdit={setEdit}>
      <File
        accept='image/png, image/jpeg'
        changeFiles={changeFile}
        files={file}
        multiple={false}
        name='avatar'
      />
    </Form>
  )
}

export default Avatar
