import { type LoaderFunction, redirect } from 'react-router'
import { backendUrl } from '../lib/variables'
import type { UserExtraData } from '../types/data'

const userLoader: LoaderFunction = async () => {
  const response = await fetch(`${backendUrl}/user`, { credentials: 'include' })

  if (!response.ok) {
    return redirect('/auth/login')
  }

  const json: UserExtraData[] = await response.json()
  return json
}

export default userLoader
