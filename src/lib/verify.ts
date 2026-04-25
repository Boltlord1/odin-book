import { type LoaderFunction, redirect } from 'react-router'

const verify: LoaderFunction = async () => {
	const response = await fetch('http://localhost:3000/auth/verify', {
		credentials: 'include'
	})

	return response.ok ? redirect('/app/post') : redirect('/auth/login')
}

export default verify
