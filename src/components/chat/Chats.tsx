import { ChatSlashIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import type { ChatDataMinimal } from '../../types/data'
import { Avatar } from '../general/Avatar'

const Chats: FunctionComponent = () => {
  const chats: ChatDataMinimal[] = []

  if (chats.length === 0) {
    return (
      <div className='flex flex-col items-center gap-4'>
        <ChatSlashIcon fill='#333' size={256} weight='thin' />
        <h2 className='w-2/3 text-center text-lg'>
          No chats found. Message a user to create a chat.
        </h2>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-4'>
      {chats.map((c) => (
        <div key={c.id}>
          <div className='flex gap-2'>
            <Link to={`/app/profile/${c.user.id}`}>
              <Avatar publicId={c.user.avatar} />
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
