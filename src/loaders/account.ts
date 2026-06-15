import type { LoaderFunction } from 'react-router'
import { redirect } from 'react-router'
import { BACKEND_URL } from '../lib/variables'

export const accountLoader: LoaderFunction = async () => {
  const response = await fetch(`${BACKEND_URL}/auth/verify`, {
    credentials: 'include'
  })

  if (response.ok) {
    return true
  }

  return redirect('/auth/login')
}
