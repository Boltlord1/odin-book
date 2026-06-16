import { AdvancedImage } from '@cloudinary/react'
import { UserCircleIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { getAvatar, getBigAvatar, getMedAvatar } from '../../lib/cloudinary'

interface Props {
  publicId: string | null | undefined
}

const Avatar: FunctionComponent<Props> = ({ publicId }) => {
  if (publicId) {
    return (
      <AdvancedImage
        className='aspect-square h-8 w-8 rounded-full bg-gray-50 dark:bg-zinc-800'
        cldImg={getAvatar(publicId)}
      />
    )
  }
  return <UserCircleIcon className='h-8 w-8 rounded-full' />
}

const MedAvatar: FunctionComponent<Props> = ({ publicId }) => {
  if (publicId) {
    return (
      <AdvancedImage
        className='aspect-square h-24 w-24 rounded-full bg-gray-50 dark:bg-zinc-800'
        cldImg={getMedAvatar(publicId)}
      />
    )
  }
  return <h2 className='text-lg'>No avatar</h2>
}

const BigAvatar: FunctionComponent<Props> = ({ publicId }) => {
  if (publicId) {
    return (
      <AdvancedImage
        className='aspect-square h-full max-h-64 w-full max-w-64 rounded-full bg-gray-50 dark:bg-zinc-800'
        cldImg={getBigAvatar(publicId)}
      />
    )
  }
  return (
    <UserCircleIcon className='aspect-square h-full max-h-64 w-full max-w-64 rounded-full' />
  )
}

export { Avatar, BigAvatar, MedAvatar }
