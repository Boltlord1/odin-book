import { type LoaderFunction, redirect } from 'react-router'
import type { PostData, ProfileData } from '../types/data'
import getUser from './auth'
import { backendUrl } from './variables'

const indexLoader: LoaderFunction = async () => {
  const response = await fetch(`${backendUrl}/auth/verify`, {
    credentials: 'include'
  })

  return response.ok ? redirect('/app/post') : redirect('/auth/login')
}

const selfLoader: LoaderFunction = async () => {
  const user = await getUser()

  if (user === null) {
    return redirect('/auth/login')
  }

  return user
}

const feedLoader: LoaderFunction = async () => {
  const response = await fetch(`${backendUrl}/post`, {
    credentials: 'include'
  })

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

const profileLoader: LoaderFunction = async ({ params }) => {
  const user = await getUser()
  if (user === null) {
    return redirect('/auth/login')
  }

  if (user.id === params.id) {
    return redirect('/app/profile')
  }

  const response = await fetch(`${backendUrl}/user/${params.id}`, {
    credentials: 'include'
  })

  if (!response.ok) {
    return redirect('/auth/login')
  }

  const json: ProfileData = await response.json()
  return json
}

export { feedLoader, indexLoader, postLoader, profileLoader, selfLoader }
