import type { FunctionComponent, SubmitEventHandler } from 'react'
import type { ReqError } from '../lib/types'
import { useNavigate } from 'react-router'

const LogIn: FunctionComponent = () => {
	const navigate = useNavigate()
	const submit: SubmitEventHandler = async (event) => {
		event.preventDefault()
		const form = event.target
		const data = new FormData(form)
		const body = Object.fromEntries(data.entries())

		const options: RequestInit = {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(body)
		}

		const response = await fetch('http://localhost:3000/auth/login', options)
		const json: true | ReqError[] = await response.json()
		if (json === true) {
			return navigate('/app')
		}
		console.log(json)
	}

	return (
		<form
			onSubmit={submit}
			className='flex flex-col w-1/2 min-w-3xs p-2 gap-2'
		>
			<input
				type='text'
				name='username'
				className='border-1 border-gray-700 rounded-md outline-0 p-1 pl-4 pr-4 focus:border-blue-600 focus:shadow-md'
			/>
			<input
				type='password'
				name='password'
				className='border-1 border-gray-700 rounded-md outline-0 p-1 pl-4 pr-4 focus:border-blue-600 focus:shadow-md'
			/>
			<button type='submit' className='text-white bg-sky-950 rounded-2xl p-2 pl-6 pr-6 self-center active:bg-sky-800'>Submit</button>
		</form>
	)
}

export default LogIn
