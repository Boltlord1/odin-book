import {
  ChatIcon,
  HouseIcon,
  PlusCircleIcon,
  UserIcon,
  UsersIcon
} from '@phosphor-icons/react'
import type { DashboardLink } from '../types/app'

const BACKEND_URL: string = import.meta.env.VITE_API_URL

const dashboardLinks: DashboardLink[] = [
  { id: 'post', text: 'Feed', Icon: HouseIcon },
  { id: 'user', text: 'Users', Icon: UsersIcon },
  { id: 'upload', text: 'Upload', Icon: PlusCircleIcon },
  { id: 'chat', text: 'Chats', Icon: ChatIcon },
  { id: 'profile', text: 'Profile', Icon: UserIcon }
]

export { BACKEND_URL, dashboardLinks }
