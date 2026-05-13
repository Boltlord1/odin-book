import { GithubLogoIcon, GoogleLogoIcon } from '@phosphor-icons/react'
import type { FunctionComponent, SubmitEventHandler } from 'react'
import { Link, useNavigate } from 'react-router'
import { jsonOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import type { ResError } from '../../types/response'
import Form from './Form'
import OAuthLink from './OAuthLink'

const LogIn: FunctionComponent = () => {
  const navigate = useNavigate()

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()
    const response = await fetch(
      `${backendUrl}/auth/login`,
      jsonOptions(event.target)
    )

    if (response.ok) {
      return navigate('/app/post')
    }

    const json: ResError[] = await response.json()
    console.log(json)
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <h2 className='text-center font-semibold text-2xl'>Log in</h2>
      <input
        className='rounded-md border border-gray-700 p-1 px-4 outline-0 focus:border-blue-600 focus:shadow-md'
        name='username'
        type='text'
      />
      <input
        className='rounded-md border border-gray-700 p-1 px-4 outline-0 focus:border-blue-600 focus:shadow-md'
        name='password'
        type='password'
      />
      <button
        className='self-center rounded-2xl bg-sky-950 p-2 px-6 text-white active:bg-sky-800'
        type='submit'
      >
        Log in
      </button>
      <OAuthLink Icon={GoogleLogoIcon} provider='Google' />
      <OAuthLink Icon={GithubLogoIcon} provider='Github' />
      <p>
        Don't have an account?{' '}
        <Link className='text-blue-800 underline' to='/auth/signup'>
          Sign up
        </Link>{' '}
        instead
      </p>
    </Form>
  )
}

export default LogIn
