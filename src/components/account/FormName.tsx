import type { FunctionComponent, SubmitEventHandler } from 'react'
import { jsonOptions } from '../../lib/options'
import { refineSelf } from '../../lib/refine'
import { backendUrl } from '../../lib/variables'
import type { EditProps } from '../../types/props'
import Form from './Form'

const Names: FunctionComponent<EditProps> = ({
	setEdit,
	setUser,
	children
}) => {
	const handleSubmit: SubmitEventHandler = async (event) => {
		event.preventDefault()
		const response = await fetch(
			`${backendUrl}/user`,
			jsonOptions(event.target, 'put')
		)
		const json = await response.json()

		if (response.ok) {
			setUser(refineSelf(json))
			setEdit(false)
			return
		}
	}

	return (
		<Form setEdit={setEdit} handleSubmit={handleSubmit}>
			{children}
		</Form>
	)
}

export default Names
