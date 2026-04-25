import { FileArrowUpIcon } from '@phosphor-icons/react'
import type { FunctionComponent, SubmitEventHandler } from 'react'
import { Link, useNavigate } from 'react-router'
import useFiles from '../lib/changeFile'
import { formPost } from '../lib/options'
import { backendUrl } from '../lib/variables'
import AuthForm from './AuthForm'
import Label from './LabelledInput'

const SignUp: FunctionComponent = () => {
	const navigate = useNavigate()
	const [file, changeFile] = useFiles()

	const username = <input type='text' name='username' id='username' />
	const display = <input type='text' name='display' id='display' />
	const password = <input type='password' name='password' id='password' />

	const image = (
		<input
			type='file'
			name='avatar'
			id='avatar'
			accept='image/png, image/jpeg'
			onChange={changeFile}
			className='hidden'
		/>
	)
	const imageLabel = (
		<div className='flex justify-evenly items-center bg-gray-200 p-2 pl-4 pr-4 rounded-2xl text-5xl active:bg-gray-100'>
			<FileArrowUpIcon
				weight='bold'
				className={`icon ${file ? 'uploaded' : 'upload'}`}
			/>
			<span
				className={`text-gray-${file ? 8 : 6}00 text-2xl text-center min-w-2/3 underline underline-offset-10 decoration-1`}
			>
				{file === null ? 'No files' : file}
			</span>
		</div>
	)

	const handleSubmit: SubmitEventHandler = async (event) => {
		event.preventDefault()

		const response = await fetch(
			`${backendUrl}/auth/register`,
			formPost(event.target)
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
			<Label label='Avatar' input={image} extra={imageLabel} />
			<button type='submit'>Sign Up</button>
			<div>
				<Link to={`${backendUrl}/auth/google`}>Sign in with Google</Link>
				<Link to={`${backendUrl}/auth/github`}>Sign in with Github</Link>
			</div>
		</AuthForm>
	)
}

export default SignUp
