import type { SelfData } from '../types/data'
import { backendUrl } from './variables'

let user: SelfData | null = null

const getUser = async () => {
  if (!user) {
    const response = await fetch(`${backendUrl}/user/self`, {
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
