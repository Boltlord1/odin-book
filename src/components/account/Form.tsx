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
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<button type='button' onClick={() => setEdit(false)}>
				Cancel
			</button>
			<button type='submit'>Save</button>
			{children}
		</form>
	)
}

export default Form
