import { type LoaderFunction, redirect } from 'react-router'
import { backendUrl } from '../lib/variables'
import type { PostData } from '../types/data'

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

export default feedLoader
