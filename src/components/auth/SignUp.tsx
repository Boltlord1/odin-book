import type { FunctionComponent, SubmitEventHandler } from 'react'
import { Link, useNavigate } from 'react-router'
import useFiles from '../../hooks/files'
import { formOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import File from '../general/File'
import Input from '../general/Input'
import Label from '../general/Label'
import Form from './Form'

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate()
  const [file, changeFile] = useFiles()

  const username = <Input name='username' type='text' />
  const display = <Input name='display' type='text' />
  const email = <Input name='email' type='email' />
  const password = <Input name='password' type='password' />
  const confirm = <Input name='confirm-password' type='password' />

  const handleSubmit: SubmitEventHandler = async event => {
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
      <Label input={username} label='Username' />
      <Label input={display} label='Display Name' />
      <Label input={email} label='Email' />
      <Label input={password} label='Password' />
      <Label input={confirm} label='Confirm Password' />
      <File
        accept='image/png, image/jpeg'
        changeFiles={changeFile}
        files={file}
        multiple={false}
        name='avatar'
      />
      <button type='submit'>Sign Up</button>
      <div>
        <Link to={`${backendUrl}/auth/google`}>Sign in with Google</Link>
        <Link to={`${backendUrl}/auth/github`}>Sign in with Github</Link>
      </div>
      <p>
        Already have an account? <Link to='/auth/login'>Log in</Link> instead
      </p>
    </Form>
  )
}

export default SignUp
