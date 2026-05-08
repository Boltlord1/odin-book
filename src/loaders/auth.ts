import { type LoaderFunction, redirect } from 'react-router'
import { backendUrl } from '../lib/variables'

const authLoader: LoaderFunction = async () => {
  const response = await fetch(`${backendUrl}/auth/verify`, {
    credentials: 'include'
  })

  return response.ok ? redirect('/app/post') : redirect('/auth/login')
}

export default authLoader
