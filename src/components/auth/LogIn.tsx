import type { FunctionComponent, SubmitEventHandler } from 'react'
import { Link, useNavigate } from 'react-router'
import { jsonOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import type { ResError } from '../../types/response'
import Form from './Form'

const LogIn: FunctionComponent = () => {
	const navigate = useNavigate()

	const handleSubmit: SubmitEventHandler = async (event) => {
		event.preventDefault()
		const response = await fetch(
			`${backendUrl}/auth/login`,
			jsonOptions(event.target)
		)

		if (response.ok) {
			return navigate('/app/post')
		}

		const json: ResError[] = await response.json()
		console.log(json)
	}

	return (
		<Form handleSubmit={handleSubmit}>
			<input
				type='text'
				name='username'
				className='border border-gray-700 rounded-md outline-0 p-1 pl-4 pr-4 focus:border-blue-600 focus:shadow-md'
			/>
			<input
				type='password'
				name='password'
				className='border border-gray-700 rounded-md outline-0 p-1 pl-4 pr-4 focus:border-blue-600 focus:shadow-md'
			/>
			<button
				type='submit'
				className='text-white bg-sky-950 rounded-2xl p-2 pl-6 pr-6 self-center active:bg-sky-800'
			>
				Submit
			</button>
			<div>
				<Link to={`${backendUrl}/auth/google`}>Sign in with Google</Link>
				<Link to={`${backendUrl}/auth/github`}>Sign in with Github</Link>
			</div>
			<p>
				Don't have an account? <Link to='/auth/signup'>Sign up</Link> instead
			</p>
		</Form>
	)
}

export default LogIn
