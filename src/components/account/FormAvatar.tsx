import type { FunctionComponent, SubmitEventHandler } from 'react'
import useFiles from '../../hooks/useFiles'
import { formOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import type { SelfData } from '../../types/data'
import type { EditProps } from '../../types/props'
import File from '../general/File'
import Form from './Form'

const Avatar: FunctionComponent<EditProps> = ({ setEdit, setUser }) => {
	const [file, changeFile] = useFiles()

	const handleSubmit: SubmitEventHandler = async (event) => {
		event.preventDefault()
		const response = await fetch(
			`${backendUrl}/user/avatar`,
			formOptions(event.target, 'put')
		)

		if (response.ok) {
			const json: SelfData = await response.json()
			setUser(json)
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
