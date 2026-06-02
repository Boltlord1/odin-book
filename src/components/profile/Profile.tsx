import type { FunctionComponent, PropsWithChildren } from 'react'
import type { ProfileData, SelfData } from '../../types/data'
import { BigAvatar } from '../general/Avatar'

interface Props extends PropsWithChildren {
  data: ProfileData | SelfData
  followed?: boolean
}

const Profile: FunctionComponent<Props> = ({ data, children, followed }) => (
  <>
    <div className='grid grid-cols-2'>
      <BigAvatar publicId={data.avatar} />
      <div className='flex-1 self-center text-center'>
        <p className='font-semibold'>{data.display}</p>
        <p>
          {followed ? data.followerCount + 1 : data.followerCount} Follower
          {data.followerCount + 1 === 1 ? '' : 's'}
        </p>
        <p>{data.followerCount} Following</p>
      </div>
    </div>
    <div className='flex flex-wrap justify-between gap-4'>{children}</div>
  </>
)

export default Profile
