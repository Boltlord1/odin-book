import type { LoaderFunction } from 'react-router'
import { options } from '../lib/fetch'
import { BACKEND_URL } from '../lib/variables'
import type { ChatDataMinimal } from '../types/data'

export const chatsLoader: LoaderFunction = async () => {
  const response = await fetch(`${BACKEND_URL}/chat`, options)

  if (!response.ok) {
    return []
  }

  const json: ChatDataMinimal[] = await response.json()
  return json
}
