import { GithubLogoIcon, GoogleLogoIcon } from '@phosphor-icons/react'
import type { FunctionComponent, SubmitEventHandler } from 'react'
import { Link, useNavigate } from 'react-router'
import useFiles from '../../hooks/files'
import { formOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import File from '../general/File'
import Label from '../general/Label'
import Form from './Form'
import Input from './Input'
import OAuthLink from './OAuthLink'

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate()
  const [file, changeFile] = useFiles()

  const username = <Input name='username' />
  const display = <Input name='display' />
  const email = <Input name='email' type='email' />
  const password = <Input name='password' type='password' />
  const confirm = <Input name='confirm-password' type='password' />

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()

    const response = await fetch(
      `${backendUrl}/auth/signup`,
      formOptions(event.target)
    )
    const json = await response.json()

    if (json === true) {
      navigate('/app/post')
      return
    }

    console.log(json)
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <h2 className='text-center font-semibold text-2xl'>Sign up</h2>
      <Label input={username} label='Username' />
      <Label input={display} label='Display Name (Optional)' />
      <Label input={email} label='Email' />
      <Label input={password} label='Password' />
      <Label input={confirm} label='Confirm Password' />
      <div className='flex flex-col gap-1'>
        <label htmlFor='avatar'>Avatar (Optional)</label>
        <File
          accept='image/png, image/jpeg'
          changeFiles={changeFile}
          files={file}
          multiple={false}
          name='avatar'
        />
      </div>
      <button
        className='self-center rounded-2xl bg-sky-950 p-2 px-6 text-white active:bg-sky-800'
        type='submit'
      >
        Sign up
      </button>
      <OAuthLink Icon={GoogleLogoIcon} provider='Google' />
      <OAuthLink Icon={GithubLogoIcon} provider='Github' />
      <p>
        Already have an account?{' '}
        <Link className='text-blue-700 underline' to='/auth/login'>
          Log in
        </Link>{' '}
        instead
      </p>
    </Form>
  )
}

export default SignUp
