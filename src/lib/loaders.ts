import { type LoaderFunction, redirect } from 'react-router'
import type { PostData, SelfData } from '../types/data'
import { backendUrl } from './variables'

const indexLoader: LoaderFunction = async () => {
	const response = await fetch(`${backendUrl}/auth/verify`, {
		credentials: 'include'
	})

	return response.ok ? redirect('/app/post') : redirect('/auth/login')
}

const selfLoader: LoaderFunction = async () => {
	const response = await fetch(`${backendUrl}/user`, { credentials: 'include' })

	if (!response.ok) {
		return redirect('/auth/login')
	}

	const json: SelfData = await response.json()
	return json
}

const feedLoader: LoaderFunction = async () => {
	const response = await fetch(`${backendUrl}/post`, { credentials: 'include' })

	if (!response.ok) {
		return redirect('/auth/login')
	}

	const json: PostData = await response.json()
	return json
}

const postLoader: LoaderFunction = async ({ params }) => {
	const response = await fetch(`${backendUrl}/post/${params.id}`, {
		credentials: 'include'
	})

	if (!response.ok) {
		return redirect('/auth/login')
	}

	const json: PostData = await response.json()
	return json
}

export { feedLoader, indexLoader, postLoader, selfLoader }
