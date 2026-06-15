import type { LoaderFunction } from 'react-router'
import { BACKEND_URL } from '../lib/variables'
import type { PostData } from '../types/data'

export const postLoader: LoaderFunction = async ({ params }) => {
  const response = await fetch(`${BACKEND_URL}/post/${params.id}`, {
    credentials: 'include'
  })

  const json: PostData = await response.json()
  return json
}
