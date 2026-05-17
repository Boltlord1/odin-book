import type { SelfData } from '../types/data'
import { BACKEND_URL } from './variables'

let user: SelfData | null = null

const getUser = async () => {
  if (!user) {
    const response = await fetch(`${BACKEND_URL}/user/self`, {
      credentials: 'include'
    })
    if (!response.ok) {
      return null
    }

    const json: SelfData = await response.json()
    user = json
  }
  return user
}

export default getUser
