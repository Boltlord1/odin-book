import {
  ChatIcon,
  HouseIcon,
  PlusCircleIcon,
  UserIcon
} from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { NavLink } from 'react-router'

const Dashboard: FunctionComponent = () => (
  <nav className='flex justify-between'>
    <NavLink className='js-active:text-pink-500 text-4xl' to={'/app/post'}>
      <HouseIcon />
    </NavLink>
    <NavLink className='js-active:text-pink-500 text-4xl' to={'/app/upload'}>
      <PlusCircleIcon />
    </NavLink>
    <NavLink className='js-active:text-pink-500 text-4xl' to={'/app/chat'}>
      <ChatIcon />
    </NavLink>
    <NavLink className='js-active:text-pink-500 text-4xl' to={'/app/profile'}>
      <UserIcon />
    </NavLink>
  </nav>
)

export default Dashboard
