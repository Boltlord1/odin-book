import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import type { UserData } from '../../types/data'
import { Avatar } from '../general/Avatar'

interface Props {
  data: UserData
  selfId: string
}

const User: FunctionComponent<Props> = ({ data, selfId }) => (
  <div className='grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] gap-x-2 gap-y-1'>
    <Link className='' to={`/app/profile/${data.id}`}>
      <Avatar publicId={data.avatar} />
    </Link>
    <Link to={`/app/profile/${data.id}`}>
      <h3 className='font-semibold text-2xl'>{data.display}</h3>
    </Link>
    {selfId !== data.id && (
      <Link
        className='self-start rounded-xl bg-gray-100 px-4 py-1 font-semibold'
        to={`/app/message/${data.id}`}
      >
        Message
      </Link>
    )}
    <div className='col-span-3 row-start-2 flex gap-4'>
      <p className='min-w-22'>
        {data.followerCount} Follower{data.followerCount === 1 ? '' : 's'}
      </p>
      <p className='min-w-14'>
        {data.postCount} Post{data.postCount === 1 ? '' : 's'}
      </p>
    </div>
  </div>
)

export default User
