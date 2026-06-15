import type { FunctionComponent } from 'react'
import { Link, useOutletContext } from 'react-router'
import type { AppContext } from '../../types/app'
import Guard from '../general/Guard'
import ProfileFeed from './Feed'
import Profile from './Profile'

const ProfileSelf: FunctionComponent = () => {
  const { self } = useOutletContext<AppContext>()

  const settings = (
    <Link
      className='self-start rounded-full bg-gray-100 px-10 py-2 text-center'
      to={'/app/account'}
    >
      Settings
    </Link>
  )

  if (!self) {
    return <Guard msg='view your profile' />
  }

  return (
    <>
      <Profile data={self}>{settings}</Profile>
      <ProfileFeed id={self.id} />
    </>
  )
}

export default ProfileSelf
