import { type LoaderFunction, redirect } from 'react-router'
import { options } from '../lib/options'
import { backendUrl } from '../lib/variables'
import type { ChatData } from '../types/data'

const chatLoader: LoaderFunction = async ({ params }) => {
  const response = await fetch(`${backendUrl}/chat/${params.id}`, options)

  if (!response.ok) {
    return redirect('/auth/login')
  }

  const json: ChatData = await response.json()
  return json
}

export default chatLoader
