import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import { jsonPost } from '../lib/options'
import { backendUrl } from '../lib/variables'
import AuthForm from './AuthForm'
import Label from './LabelledInput'

interface Props {
	provider: 'google' | 'github'
}

const SignUpOAuth: FunctionComponent<Props> = ({ provider }) => {
	const navigate = useNavigate()

	const username = <input type='text' name='username' id='username' />
	const display = <input type='text' name='display' id='display' />

	const handleSubmit: SubmitEventHandler = async (event) => {
		event.preventDefault()

		const response = await fetch(
			`${backendUrl}/auth/${provider}/register`,
			jsonPost(event.target)
		)
		const json = await response.json()

		if (json === true) {
			navigate('/app/post')
			return
		}

		console.log(json)
	}

	return (
		<AuthForm handleSubmit={handleSubmit}>
			<Label label='Username' input={username} />
			<Label label='Display Name' input={display} />
			<button type='submit'>Sign Up</button>
		</AuthForm>
	)
}

export default SignUpOAuth
