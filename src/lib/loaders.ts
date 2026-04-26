import { type LoaderFunction, redirect } from 'react-router'
import type { RawUser } from '../types/user'
import { refineUser } from './refine'
import { backendUrl } from './variables'

const indexLoader: LoaderFunction = async () => {
	const response = await fetch(`${backendUrl}/verify`, {
		credentials: 'include'
	})

	return response.ok ? redirect('/app/post') : redirect('/auth/login')
}

const userLoader: LoaderFunction = async () => {
	const response = await fetch(`${backendUrl}/user`, { credentials: 'include' })

	if (!response.ok) {
		return redirect('/auth/login')
	}

	const json: RawUser = await response.json()
	return refineUser(json)
}

export { indexLoader, userLoader }
