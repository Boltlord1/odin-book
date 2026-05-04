import type { FunctionComponent, SubmitEventHandler } from 'react'
import { Link, useNavigate } from 'react-router'
import { jsonOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import type { ResError } from '../../types/response'
import Form from './Form'

const LogIn: FunctionComponent = () => {
  const navigate = useNavigate()

  const handleSubmit: SubmitEventHandler = async event => {
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
      <input
        className='rounded-md border border-gray-700 p-1 pr-4 pl-4 outline-0 focus:border-blue-600 focus:shadow-md'
        name='username'
        type='text'
      />
      <input
        className='rounded-md border border-gray-700 p-1 pr-4 pl-4 outline-0 focus:border-blue-600 focus:shadow-md'
        name='password'
        type='password'
      />
      <button
        className='self-center rounded-2xl bg-sky-950 p-2 pr-6 pl-6 text-white active:bg-sky-800'
        type='submit'
      >
        Submit
      </button>
      <div>
        <Link to={`${backendUrl}/auth/google`}>Sign in with Google</Link>
        <Link to={`${backendUrl}/auth/github`}>Sign in with Github</Link>
      </div>
      <p>
        Don't have an account? <Link to='/auth/signup'>Sign up</Link> instead
      </p>
    </Form>
  )
}

export default LogIn
