import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import { jsonOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import Input from '../general/Input'
import Label from '../general/Label'
import Form from './Form'

interface Props {
  provider: 'google' | 'github'
}

const SignUpOAuth: FunctionComponent<Props> = ({ provider }) => {
  const navigate = useNavigate()

  const username = <Input name='username' type='text' />
  const display = <Input name='display' type='text' />

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()

    const response = await fetch(
      `${backendUrl}/auth/${provider}/signup`,
      jsonOptions(event.target)
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
      <button type='submit'>Sign Up</button>
    </Form>
  )
}

export default SignUpOAuth
