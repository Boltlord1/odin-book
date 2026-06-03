import { type LoaderFunction, redirect } from 'react-router'
import getUser from '../lib/auth'

export const selfLoader: LoaderFunction = async () => {
  const user = await getUser()

  if (user === null) {
    return redirect('/auth/login')
  }

  return user
}
