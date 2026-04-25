import type {
	FunctionComponent,
	PropsWithChildren,
	SubmitEventHandler
} from 'react'

interface Props extends PropsWithChildren {
	handleSubmit: SubmitEventHandler
}

const AuthForm: FunctionComponent<Props> = ({ handleSubmit, children }) => {
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col w-1/2 min-w-3xs p-2 gap-2'
		>
			{children}
		</form>
	)
}

export default AuthForm
