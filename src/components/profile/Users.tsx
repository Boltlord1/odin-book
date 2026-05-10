import { AdvancedImage } from '@cloudinary/react'
import type { FunctionComponent } from 'react'
import { Link, useLoaderData, useOutletContext } from 'react-router'
import getImg from '../../lib/cloudinary'
import type { AppContext } from '../../types/app'
import type { UserExtraData } from '../../types/data'

const Users: FunctionComponent = () => {
  const users = useLoaderData<UserExtraData[]>()
  const { self } = useOutletContext<AppContext>()

  return (
    <div className='flex flex-col gap-4'>
      {users.map((u) => (
        <div key={u.id}>
          <div className='flex gap-2'>
            <Link to={`/app/profile/${u.id}`}>
              <AdvancedImage
                className='h-8 w-8 rounded-full'
                cldImg={getImg(u.avatar)}
              />
            </Link>
            <div className='flex flex-1 flex-col items-start'>
              <Link to={`/app/profile/${u.id}`}>
                <h3 className='font-semibold text-2xl'>{u.display}</h3>
              </Link>
              <div className='grid grid-cols-[minmax(100px,1fr)_minmax(100px,1fr)]'>
                <p>
                  {u.followers} Follower{u.followers === 1 ? '' : 's'}
                </p>
                <p>
                  {u.posts} Post{u.posts === 1 ? '' : 's'}
                </p>
              </div>
            </div>
            {self.id !== u.id && (
              <Link
                className='self-start rounded-xl bg-gray-100 px-4 py-2 font-semibold'
                to={`/app/chat/${u.id}`}
              >
                Message
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Users
