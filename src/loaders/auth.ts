import { type LoaderFunction, redirect } from 'react-router'
import { BACKEND_URL } from '../lib/variables'

const authLoader: LoaderFunction = async () => {
  const response = await fetch(`${BACKEND_URL}/auth/verify`, {
    credentials: 'include'
  })

  return response.ok ? redirect('/app/post') : redirect('/auth/login')
}

export default authLoader
