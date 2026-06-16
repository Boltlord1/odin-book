import { ArrowsClockwiseIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import { type FunctionComponent, useEffect, useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router'
import { getTheme, type Theme } from '../../lib/preference'
import { BACKEND_URL } from '../../lib/variables'
import type { AppContext } from '../../types/app'
import type { SelfData } from '../../types/data'
import Alert from '../general/Alert'
import { MedAvatar } from '../general/Avatar'
import Select, { type OptionTuple } from '../general/Select'
import Display from './Display'
import AvatarForm from './FormAvatar'
import NameForm from './FormName'

const Account: FunctionComponent = () => {
  const { self, setSelf, setTheme } = useOutletContext() as AppContext & {
    self: SelfData
  }
  const [editNames, setNames] = useState(false)
  const [editAvatar, setAvatar] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const [alert, setAlert] = useState('')

  const query = '?path=/app/account'
  useEffect(() => {
    const alert = searchParams.get('error')
    if (alert) {
      setAlert(alert)
      searchParams.delete('error')
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  const [tab, setTab] = useState(0)

  const butClass = 'flex-1 rounded-xl py-2 font-semibold'
  const header = (
    <div className='flex rounded-xl bg-gray-50 dark:bg-zinc-800'>
      <button
        className={`${butClass} ${tab === 0 ? 'bg-gray-100 dark:bg-zinc-700' : ''}`}
        onClick={() => setTab(0)}
        type='button'
      >
        Account
      </button>
      <button
        className={`${butClass} ${tab === 1 ? 'bg-gray-100 dark:bg-zinc-700' : ''}`}
        onClick={() => setTab(1)}
        type='button'
      >
        Preferences
      </button>
    </div>
  )

  if (tab === 1) {
    const theme = (localStorage.getItem('theme') as Theme) || 'auto'
    const themeOptions: OptionTuple<Theme> = [
      { name: 'auto', icon: ArrowsClockwiseIcon },
      { name: 'light', icon: SunIcon },
      { name: 'dark', icon: MoonIcon }
    ]
    function changeTheme(theme: Theme) {
      localStorage.setItem('theme', theme)
      setTheme(getTheme())
    }

    return (
      <>
        {header}
        <div className='flex flex-col gap-4'>
          <Select
            onChange={changeTheme}
            options={themeOptions}
            selected={theme}
            title='theme'
          />
        </div>
      </>
    )
  }

  const names = editNames ? (
    <NameForm
      displayPlaceholder={self.display}
      setEdit={setNames}
      setSelf={setSelf}
      userPlaceholder={self.name}
    />
  ) : (
    <Display
      className='grid grid-cols-[auto_1fr] gap-4 text-lg'
      setEdit={setNames}
    >
      <h2 className='font-semibold'>Username</h2>
      <h2>{self.name}</h2>
      <h2 className='font-semibold'>Display name</h2>
      <h2>{self.display}</h2>
    </Display>
  )
  const avatar = editAvatar ? (
    <AvatarForm setEdit={setAvatar} setSelf={setSelf} />
  ) : (
    <Display className='flex flex-col gap-4 text-lg' setEdit={setAvatar}>
      <h2 className='font-semibold'>Avatar</h2>
      <MedAvatar publicId={self.avatar} />
    </Display>
  )

  const email = self.identities.find((i) => i.provider === 'Email')
  const google = self.identities.find((i) => i.provider === 'Google')
  const github = self.identities.find((i) => i.provider === 'Github')

  return (
    <>
      {header}
      <div className='flex flex-col gap-4'>
        {names}
        {avatar}
        <div className='grid grid-cols-[auto_1fr] gap-4 text-lg'>
          <h2 className='col-span-2 font-semibold'>Connections:</h2>
          <h2 className='font-semibold'>Email</h2>
          {email ? (
            <h2>{email.id}</h2>
          ) : (
            <h2>
              None <Link to='/auth/signup/email'>Connect</Link>
            </h2>
          )}
          <h2 className='font-semibold'>Google</h2>
          {google ? (
            <h2>{google.data.email}</h2>
          ) : (
            <h2>
              None{' '}
              <Link to={`${BACKEND_URL}/auth/google${query}`}>Connect</Link>
            </h2>
          )}
          <h2 className='font-semibold'>Github</h2>
          {github ? (
            <h2>
              <Link to={github.data.url}>{github.data.username}</Link>
            </h2>
          ) : (
            <h2>
              None{' '}
              <Link to={`${BACKEND_URL}/auth/github${query}`}>Connect</Link>
            </h2>
          )}
        </div>
        <Link
          className='self-start rounded-xl bg-gray-100 px-4 py-1 dark:bg-zinc-700'
          to={`${BACKEND_URL}/auth/logout`}
        >
          Log out
        </Link>
        <Alert alert={alert} />
      </div>
    </>
  )
}

export default Account
