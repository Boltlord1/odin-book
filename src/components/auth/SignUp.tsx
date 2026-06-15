import type { FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router'
import type { ServerError } from '../../types/response'
import EmailInput from '../validate/Email'
import File from '../validate/File'
import Form from '../validate/Form'
import NameInput from '../validate/Name'
import PasswordInput from '../validate/Password'
import TextInput from '../validate/Text'
import OAuthLinks from './OAuthLinks'

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate()
  function success(json?: ServerError) {
    if (json) {
      setTimeout(() => {
        navigate('/app/post')
      }, 5000)
      return
    }
    navigate('/app/post')
  }

  const footer = (
    <>
      <button
        className='self-center rounded-2xl bg-sky-950 p-2 px-6 text-white active:bg-sky-800'
        onMouseDown={(e) => e.preventDefault()}
        type='submit'
      >
        Sign up
      </button>
      <OAuthLinks />
      <p>
        Already have an account?{' '}
        <Link
          className='text-blue-800 underline underline-offset-2 visited:text-indigo-800'
          to='/auth/login'
        >
          Log in
        </Link>{' '}
        instead
      </p>
    </>
  )

  return (
    <Form
      footer={footer}
      header='Sign up'
      path='/auth/signup'
      success={success}
    >
      <NameInput />
      <TextInput label='Display name' min={2} name='display' />
      <EmailInput />
      <PasswordInput />
      <File
        accept='image/png, image/jpeg'
        label='Avatar (Optional)'
        name='avatar'
      />
    </Form>
  )
}

export default SignUp
