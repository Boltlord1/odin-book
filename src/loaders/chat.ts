import { type LoaderFunction, redirect } from 'react-router'
import { options } from '../lib/fetch'
import { BACKEND_URL } from '../lib/variables'
import type { ChatData } from '../types/data'

const chatLoader: LoaderFunction = async ({ params }) => {
  const response = await fetch(`${BACKEND_URL}/chat/${params.id}`, options)

  if (!response.ok) {
    return redirect('/auth/login')
  }

  const json: ChatData = await response.json()
  return json
}

export default chatLoader
