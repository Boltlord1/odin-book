import type { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import Form from '../validate/Form'
import NameInput from '../validate/Name'
import TextInput from '../validate/Text'

interface Props {
  provider: 'Google' | 'Github'
}

const SignUpOAuth: FunctionComponent<Props> = ({ provider }) => {
  const navigate = useNavigate()
  function success() {
    navigate('/app/post')
  }

  const footer = (
    <button
      className='self-center rounded-2xl bg-sky-950 p-2 px-6 text-white active:bg-sky-800'
      type='submit'
    >
      Sign Up
    </button>
  )

  return (
    <Form
      footer={footer}
      header={`Create an account with ${provider}`}
      path={`/auth/${provider.toLowerCase()}/signup`}
      success={success}
    >
      <NameInput />
      <TextInput label='Display name' min={2} name='display' />
    </Form>
  )
}

export default SignUpOAuth
