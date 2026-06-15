import type { FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router'
import Form from '../validate/Form'
import TextInput from '../validate/Text'
import OAuthLinks from './OAuthLinks'

const LogIn: FunctionComponent = () => {
  const navigate = useNavigate()
  function success() {
    navigate('/app/post')
  }

  const footer = (
    <>
      <button
        className='self-center rounded-2xl bg-sky-950 px-6 py-2 text-white active:bg-sky-800'
        type='submit'
      >
        Log in
      </button>
      <OAuthLinks />
      <p>
        Don't have an account?{' '}
        <Link
          className='text-blue-800 underline underline-offset-2 visited:text-indigo-800'
          to='/auth/signup'
        >
          Sign up
        </Link>{' '}
        instead
      </p>
      <p>
        <Link
          className='text-blue-800 underline underline-offset-2 visited:text-indigo-800'
          to='/app/post'
        >
          Enter
        </Link>{' '}
        without signing in
      </p>
    </>
  )

  return (
    <Form footer={footer} header='Log in' path='/auth/login' success={success}>
      <TextInput label='Username or Email' name='username' required />
      <TextInput label='Password' name='password' required type='password' />
    </Form>
  )
}

export default LogIn
