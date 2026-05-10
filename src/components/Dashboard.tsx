import {
  ChatIcon,
  HouseIcon,
  PlusCircleIcon,
  UserIcon,
  UsersIcon
} from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { NavLink } from 'react-router'
import type { DashboardLink } from '../types/app'

const links: DashboardLink[] = [
  { id: 'post', Icon: HouseIcon },
  { id: 'user', Icon: UsersIcon },
  { id: 'upload', Icon: PlusCircleIcon },
  { id: 'chat', Icon: ChatIcon },
  { id: 'profile', Icon: UserIcon }
]

const Dashboard: FunctionComponent = () => (
  <nav className='flex justify-between'>
    {links.map(({ id, Icon }) => (
      <NavLink
        className='js-active:text-pink-500 text-4xl'
        key={id}
        to={`/app/${id}`}
      >
        <Icon />
      </NavLink>
    ))}
  </nav>
)

export default Dashboard
