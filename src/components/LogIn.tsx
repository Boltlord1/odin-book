import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import { jsonPost } from '../lib/options'
import type { ReqError } from '../types/response'

const LogIn: FunctionComponent = () => {
	const navigate = useNavigate()

	const submit: SubmitEventHandler = async (event) => {
		event.preventDefault()
		const response = await fetch(
			'http://localhost:3000/auth/login',
			jsonPost(event.target)
		)
		const json: true | ReqError[] = await response.json()
		if (json === true) {
			return navigate('/app')
		}

		console.log(json)
	}

	return (
		<form onSubmit={submit} className='flex flex-col w-1/2 min-w-3xs p-2 gap-2'>
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
		</form>
	)
}

export default LogIn
