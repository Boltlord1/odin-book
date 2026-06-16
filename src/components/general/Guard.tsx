import { UserCircleDashedIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { Link, useOutletContext } from 'react-router'
import type { AppContext } from '../../types/app'

interface Props {
  msg: string
}

const Guard: FunctionComponent<Props> = ({ msg }) => {
  const { theme } = useOutletContext<AppContext>()
  return (
    <div className='flex flex-col items-center gap-4'>
      <UserCircleDashedIcon
        fill={theme === 'dark' ? '#fff' : '#333'}
        size={256}
        weight='thin'
      />
      <h2 className='w-2/3 text-center text-lg'>
        <Link
          className='text-blue-800 underline underline-offset-2 visited:text-indigo-800'
          to='/auth/login'
        >
          Log in
        </Link>{' '}
        to {msg}.
      </h2>
    </div>
  )
}

export default Guard
