import { AdvancedImage } from '@cloudinary/react'
import type { FunctionComponent } from 'react'
import { Link, useLoaderData } from 'react-router'
import getImg from '../../lib/cloudinary'
import type { ChatDataMinimal } from '../../types/data'

const Chats: FunctionComponent = () => {
  const chats = useLoaderData<ChatDataMinimal[]>()

  return (
    <div className='flex flex-col gap-4'>
      {chats.map((c) => (
        <div key={c.id}>
          <div className='flex gap-2'>
            <Link to={`/app/profile/${c.user.id}`}>
              <AdvancedImage
                className='h-8 w-8 rounded-full'
                cldImg={getImg(c.user.avatar)}
              />
            </Link>
            <div className='flex-1'>
              <Link to={`/app/profile/${c.user.id}`}>
                <h3 className='font-semibold text-2xl'>{c.user.display}</h3>
              </Link>
              <Link
                className='text-gray-800 text-lg'
                to={`/app/chat/${c.user.id}`}
              >
                {c.message.content}
              </Link>
            </div>
            <Link
              className='self-start rounded-xl bg-gray-100 px-4 py-2 font-semibold'
              to={`/app/chat/${c.user.id}`}
            >
              Message ({c.messageCount})
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats
