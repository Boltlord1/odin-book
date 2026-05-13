import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import { jsonOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import Label from '../general/Label'
import Form from './Form'
import Input from './Input'

interface Props {
  provider: 'Google' | 'Github'
}

const SignUpOAuth: FunctionComponent<Props> = ({ provider }) => {
  const navigate = useNavigate()

  const username = <Input name='username' />
  const display = <Input name='display' />

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()

    const response = await fetch(
      `${backendUrl}/auth/${provider.toLowerCase()}/signup`,
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
      <h2 className='text-center text-xl'>Create an account with {provider}</h2>
      <Label input={username} label='Username' />
      <Label input={display} label='Display Name' />
      <button
        className='self-center rounded-2xl bg-sky-950 p-2 px-6 text-white active:bg-sky-800'
        type='submit'
      >
        Sign Up
      </button>
    </Form>
  )
}

export default SignUpOAuth
