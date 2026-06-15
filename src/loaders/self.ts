import type { LoaderFunction } from 'react-router'
import getUser from '../lib/auth'

export const selfLoader: LoaderFunction = async () => {
  const user = await getUser()

  return user
}
