import type { FunctionComponent, SubmitEventHandler } from 'react'
import { Link, useNavigate } from 'react-router'
import useFiles from '../../lib/changeFile'
import { formOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import File from '../general/File'
import Label from '../general/Label'
import AuthForm from './AuthForm'

const SignUp: FunctionComponent = () => {
	const navigate = useNavigate()
	const [file, changeFile] = useFiles()

	const username = <input type='text' name='username' id='username' />
	const display = <input type='text' name='display' id='display' />
	const password = <input type='password' name='password' id='password' />

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
		<AuthForm handleSubmit={handleSubmit}>
			<Label label='Username' input={username} />
			<Label label='Display Name' input={display} />
			<Label label='Password' input={password} />
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
		</AuthForm>
	)
}

export default SignUp
