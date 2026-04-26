import type { FunctionComponent } from 'react'
import type { DisplayProps } from '../../types/props'

const Display: FunctionComponent<DisplayProps> = ({ setEdit, children }) => {
	return (
		<div>
			<button type='button' onClick={() => setEdit(true)}>
				Edit
			</button>
			{children}
		</div>
	)
}

export default Display
