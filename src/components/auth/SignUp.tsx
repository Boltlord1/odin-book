import type { FunctionComponent, SubmitEventHandler } from 'react'
import { Link, useNavigate } from 'react-router'
import useFiles from '../../lib/changeFile'
import { formOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import File from '../general/File'
import Input from '../general/Input'
import Label from '../general/Label'
import Form from './Form'

const SignUp: FunctionComponent = () => {
	const navigate = useNavigate()
	const [file, changeFile] = useFiles()

	const username = <Input type='text' name='username' />
	const display = <Input type='text' name='display' />
	const email = <Input type='email' name='email' />
	const password = <Input type='password' name='password' />
	const confirm = <Input type='password' name='confirm-password' />

	const handleSubmit: SubmitEventHandler = async (event) => {
		event.preventDefault()

		const response = await fetch(
			`${backendUrl}/auth/register`,
			formOptions(event.target)
		)
		const json = await response.json()

		if (json === true) {
			navigate('/app/post')
			return
		}

		console.log(json)
	}

	return (
		<Form handleSubmit={handleSubmit}>
			<Label label='Username' input={username} />
			<Label label='Display Name' input={display} />
			<Label label='Email' input={email} />
			<Label label='Password' input={password} />
			<Label label='Confirm Password' input={confirm} />
			<File
				name='avatar'
				accept='image/png, image/jpeg'
				multiple={false}
				files={file}
				changeFiles={changeFile}
			/>
			<button type='submit'>Sign Up</button>
			<div>
				<Link to={`${backendUrl}/auth/google`}>Sign in with Google</Link>
				<Link to={`${backendUrl}/auth/github`}>Sign in with Github</Link>
			</div>
			<p>
				Already have an account? <Link to='/auth/login'>Log in</Link> instead
			</p>
		</Form>
	)
}

export default SignUp
