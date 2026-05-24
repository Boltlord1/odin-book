import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import type { UserExtraData } from '../../types/data'
import { Avatar } from '../general/Avatar'

interface Props {
  data: UserExtraData
  selfId: string
}

const User: FunctionComponent<Props> = ({ data, selfId }) => (
  <div key={data.id}>
    <div className='flex gap-2'>
      <Link to={`/app/profile/${data.id}`}>
        <Avatar publicId={data.avatar} />
      </Link>
      <div className='flex flex-1 flex-col items-start'>
        <Link to={`/app/profile/${data.id}`}>
          <h3 className='font-semibold text-2xl'>{data.display}</h3>
        </Link>
        <div className='grid grid-cols-[minmax(100px,1fr)_minmax(100px,1fr)]'>
          <p>
            {data.followers} Follower{data.followers === 1 ? '' : 's'}
          </p>
          <p>
            {data.posts} Post{data.posts === 1 ? '' : 's'}
          </p>
        </div>
      </div>
      {selfId !== data.id && (
        <Link
          className='self-start rounded-xl bg-gray-100 px-4 py-2 font-semibold'
          to={`/app/chat/${data.id}`}
        >
          Message
        </Link>
      )}
    </div>
  </div>
)

export default User
