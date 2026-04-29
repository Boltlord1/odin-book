import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import { jsonOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import Input from '../general/Input'
import Label from '../general/Label'
import Form from './Form'

const SignUpEmail: FunctionComponent = () => {
	const navigate = useNavigate()

	const email = <Input type='email' name='email' />
	const password = <Input type='password' name='password' />
	const confirm = <Input type='password' name='confirm-password' />

	const handleSubmit: SubmitEventHandler = async (event) => {
		event.preventDefault()

		const response = await fetch(
			`${backendUrl}/auth/email`,
			jsonOptions(event.target)
		)

		if (response.ok) {
			navigate('/')
			return
		}

		console.log(response)
	}

	return (
		<Form handleSubmit={handleSubmit}>
			<Label label='Email' input={email} />
			<Label label='Password' input={password} />
			<Label label='Confirm Password' input={confirm} />
			<button type='submit'>Sign Up</button>
		</Form>
	)
}

export default SignUpEmail
