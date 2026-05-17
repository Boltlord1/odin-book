import { AdvancedImage } from '@cloudinary/react'
import { type FunctionComponent, useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { getImg } from '../../lib/cloudinary'
import { BACKEND_URL } from '../../lib/variables'
import type { AppContext } from '../../types/app'
import Display from './Display'
import AvatarForm from './FormAvatar'
import NameForm from './FormName'

const Account: FunctionComponent = () => {
  const { self, setSelf } = useOutletContext<AppContext>()
  const [editNames, setNames] = useState(false)
  const [editAvatar, setAvatar] = useState(false)

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
      <AdvancedImage
        className='h-24 w-24 rounded-full'
        cldImg={getImg(self.avatar)}
      />
    </Display>
  )

  const email = self.identities.find((i) => i.provider === 'Email')
  const google = self.identities.find((i) => i.provider === 'Google')
  const github = self.identities.find((i) => i.provider === 'Github')

  return (
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
            None <Link to={`${BACKEND_URL}/auth/google`}>Connect</Link>
          </h2>
        )}
        <h2 className='font-semibold'>Github</h2>
        {github ? (
          <h2>
            <Link to={github.data.url}>{github.data.username}</Link>
          </h2>
        ) : (
          <h2>
            None <Link to={`${BACKEND_URL}/auth/github`}>Connect</Link>
          </h2>
        )}
      </div>
      <Link
        className='self-start rounded-xl bg-gray-100 px-4 py-1'
        to={`${BACKEND_URL}/auth/logout`}
      >
        Log out
      </Link>
    </div>
  )
}

export default Account
