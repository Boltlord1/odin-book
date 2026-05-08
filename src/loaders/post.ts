import { type LoaderFunction, redirect } from 'react-router'
import { backendUrl } from '../lib/variables'
import type { PostData } from '../types/data'

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

export default postLoader
