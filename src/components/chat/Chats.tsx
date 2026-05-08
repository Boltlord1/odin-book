import { AdvancedImage } from '@cloudinary/react'
import { ChatsIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { Link, useLoaderData } from 'react-router'
import getImg from '../../lib/cloudinary'
import type { ChatDataMinimal } from '../../types/data'
import Icon from '../general/Icon'

const Chats: FunctionComponent = () => {
  const chats = useLoaderData<ChatDataMinimal[]>()

  return (
    <div className='flex flex-col py-4'>
      {chats.map((c) => (
        <div className='px-4' key={c.id}>
          <div className='flex justify-between'>
            <Link className='flex gap-2' to={`/app/profile/${c.user.id}`}>
              <AdvancedImage
                className='h-8 w-8 rounded-full'
                cldImg={getImg(c.user.avatar)}
              />
              <h3 className='font-semibold text-2xl'>{c.user.display}</h3>
            </Link>
            <Link
              className='justify-self-end-safe'
              to={`/app/chat/${c.user.id}`}
            >
              <Icon
                divProps={{ className: 'text-lg' }}
                Icon={ChatsIcon}
                iconProps={{
                  fill: '',
                  className: 'w-8 h-8',
                  weight: 'regular'
                }}
                text={c.messageCount}
              />
            </Link>
          </div>
          <Link
            className='ml-10 text-gray-800 text-lg'
            to={`/app/chat/${c.user.id}`}
          >
            {c.message.content}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Chats
