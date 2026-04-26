import type { FunctionComponent, SubmitEventHandler } from 'react'
import { formOptions } from '../../lib/options'
import { refineUser } from '../../lib/refine'
import { backendUrl } from '../../lib/variables'
import type { EditProps } from '../../types/props'
import File from '../general/File'
import useFiles from '../../lib/changeFile'
import Form from './Form'

const Avatar: FunctionComponent<EditProps> = ({ setEdit, setUser }) => {
  const [file, changeFile] = useFiles()

	const handleSubmit: SubmitEventHandler = async (event) => {
		event.preventDefault()
		const response = await fetch(
			`${backendUrl}/user/avatar`,
			formOptions(event.target, 'put')
		)
		const json = await response.json()

		if (response.ok) {
			setUser(refineUser(json))
			setEdit(false)
			return
		}
	}

	return (
		<Form setEdit={setEdit} handleSubmit={handleSubmit}>
      <File
				name='avatar'
				accept='image/png, image/jpeg'
				multiple={false}
				files={file}
				changeFiles={changeFile}
			/>
    </Form>
	)
}

export default Avatar
