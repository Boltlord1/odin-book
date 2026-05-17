import type { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import EmailInput from '../validate/Email'
import Form from '../validate/Form'
import PasswordInput from '../validate/Password'

const SignUpEmail: FunctionComponent = () => {
  const navigate = useNavigate()
  function success() {
    navigate('/auth/login')
  }

  const footer = <button type='submit'>Sign Up</button>

  return (
    <Form
      footer={footer}
      header='Connect email'
      path='/auth/email'
      success={success}
    >
      <EmailInput />
      <PasswordInput />
    </Form>
  )
}

export default SignUpEmail
