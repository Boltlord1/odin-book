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
        className='h-8 w-8 rounded-full'
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
        className='h-24 w-24 rounded-full'
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
        className='h-full max-h-64 w-full max-w-64 rounded-full'
        cldImg={getBigAvatar(publicId)}
      />
    )
  }
  return (
    <UserCircleIcon className='h-full max-h-64 w-full max-w-64 rounded-full' />
  )
}

export { Avatar, BigAvatar, MedAvatar }
