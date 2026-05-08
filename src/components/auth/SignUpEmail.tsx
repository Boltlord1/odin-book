import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import { jsonOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import Input from '../general/Input'
import Label from '../general/Label'
import Form from './Form'

const SignUpEmail: FunctionComponent = () => {
  const navigate = useNavigate()

  const email = <Input name='email' type='email' />
  const password = <Input name='password' type='password' />
  const confirm = <Input name='confirm-password' type='password' />

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()

    const response = await fetch(
      `${backendUrl}/auth/email`,
      jsonOptions(event.target)
    )

    if (response.ok) {
      navigate('/')
      return
    }

    console.log(response)
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Label input={email} label='Email' />
      <Label input={password} label='Password' />
      <Label input={confirm} label='Confirm Password' />
      <button type='submit'>Sign Up</button>
    </Form>
  )
}

export default SignUpEmail
