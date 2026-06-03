import { type LoaderFunction, redirect } from 'react-router'
import getUser from '../lib/auth'
import { BACKEND_URL } from '../lib/variables'
import type { ProfileData } from '../types/data'

export const profileLoader: LoaderFunction = async ({ params }) => {
  const user = await getUser()
  if (user === null) {
    return redirect('/auth/login')
  }

  if (user.id === params.id) {
    return redirect('/app/profile')
  }

  const response = await fetch(`${BACKEND_URL}/user/${params.id}`, {
    credentials: 'include'
  })

  if (!response.ok) {
    return redirect('/auth/login')
  }

  const json: ProfileData = await response.json()
  return json
}
