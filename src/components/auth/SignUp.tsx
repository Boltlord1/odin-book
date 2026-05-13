import { GithubLogoIcon, GoogleLogoIcon } from '@phosphor-icons/react'
import {
  type ChangeEventHandler,
  type FunctionComponent,
  type SubmitEventHandler,
  useState
} from 'react'
import { Link, useNavigate } from 'react-router'
import useDebounce from '../../hooks/debounce'
import useFetch from '../../hooks/fetch'
import useFiles from '../../hooks/files'
import useValidate from '../../hooks/validate'
import { formOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import type { ResError } from '../../types/response'
import File from '../general/File'
import Available from './Available'
import Form from './Form'
import Label from './Label'
import OAuthLink from './OAuthLink'

const SignUp: FunctionComponent = () => {
  const { values, errors, change, blur, validate, server } = useValidate(
    'username',
    'display',
    'email',
    'password',
    'confirm-password'
  )
  const navigate = useNavigate()
  const [file, changeFile] = useFiles()
  const [available, setAvailable] = useState(true)
  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 200)

  const path = `${backendUrl}/user/name?name=${debouncedName}`
  useFetch(setAvailable, path, debouncedName)

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value)
    change(event)
  }

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()

    if (!(available && validate())) {
      return
    }

    const response = await fetch(
      `${backendUrl}/auth/signup`,
      formOptions(event.target)
    )

    if (response.ok) {
      navigate('/app/post')
      return
    }

    const json: ResError[] = await response.json()
    server(json.filter((e) => e.type === 'client'))

    console.log(json)
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <h2 className='text-center font-semibold text-2xl'>Sign up</h2>
      <Label
        blur={blur}
        change={changeUsername}
        errors={errors.username}
        label='Username'
        name='username'
        value={values.username}
      >
        {debouncedName && (
          <Available available={available} name={debouncedName} />
        )}
      </Label>
      <Label
        blur={blur}
        change={change}
        errors={errors.display}
        label='Display Name (Optional)'
        name='display'
        value={values.display}
      />
      <Label
        blur={blur}
        change={change}
        errors={errors.email}
        label='Email'
        name='email'
        type='email'
        value={values.email}
      />
      <Label
        blur={blur}
        change={change}
        errors={errors.password}
        label='Password'
        name='password'
        type='password'
        value={values.password}
      />
      <Label
        blur={blur}
        change={change}
        errors={errors['confirm-password']}
        label='Confirm Password'
        name='confirm-password'
        type='password'
        value={values['confirm-password']}
      />
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
        onMouseDown={(e) => e.preventDefault()}
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
