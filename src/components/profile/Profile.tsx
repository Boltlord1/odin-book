import { AdvancedImage } from '@cloudinary/react'
import type { FunctionComponent, PropsWithChildren } from 'react'
import getImg from '../../lib/cloudinary'
import type { ProfileData, SelfData } from '../../types/data'

interface Props extends PropsWithChildren {
  data: ProfileData | SelfData
  followed?: boolean
}

const Profile: FunctionComponent<Props> = ({ data, children, followed }) => (
  <div className='flex flex-col gap-4 p-4'>
    <div className='grid grid-cols-2'>
      <AdvancedImage className='rounded-full' cldImg={getImg(data.avatar)} />
      <div className='flex-1 self-center text-center'>
        <p className='font-semibold'>{data.display}</p>
        <p>{followed ? data.followers + 1 : data.followers} Followers</p>
        <p>{data.follows} Following</p>
      </div>
    </div>
    <div className='flex flex-col'>{children}</div>
  </div>
)

export default Profile
