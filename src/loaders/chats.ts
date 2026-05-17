import { type LoaderFunction, redirect } from 'react-router'
import { options } from '../lib/fetch'
import { BACKEND_URL } from '../lib/variables'
import type { ChatDataMinimal } from '../types/data'

const chatsLoader: LoaderFunction = async () => {
  const response = await fetch(`${BACKEND_URL}/chat`, options)

  if (!response.ok) {
    return redirect('/auth/login')
  }

  const json: ChatDataMinimal[] = await response.json()
  return json
}

export default chatsLoader
