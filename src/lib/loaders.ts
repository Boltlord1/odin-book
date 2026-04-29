import { type LoaderFunction, redirect } from 'react-router'
import type { RawSelf } from '../types/user'
import { refineSelf } from './refine'
import { backendUrl } from './variables'

const indexLoader: LoaderFunction = async () => {
	const response = await fetch(`${backendUrl}/auth/verify`, {
		credentials: 'include'
	})

	return response.ok ? redirect('/app/post') : redirect('/auth/login')
}

const userLoader: LoaderFunction = async () => {
	const response = await fetch(`${backendUrl}/user`, { credentials: 'include' })

	if (!response.ok) {
		return redirect('/auth/login')
	}

	const json: RawSelf = await response.json()
	return refineSelf(json)
}

export { indexLoader, userLoader }
