import { XIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import shorten from '../../lib/shorten'
import { BACKEND_URL } from '../../lib/variables'
import type { ChatDataMinimal } from '../../types/data'
import { Avatar } from '../general/Avatar'

interface Props {
  chat: ChatDataMinimal
  remove: (id: string) => void
}

const ChatListItem: FunctionComponent<Props> = ({ chat, remove }) => {
  const hideChat = async () => {
    const response = await fetch(`${BACKEND_URL}/chat/${chat.id}`, {
      method: 'put',
      credentials: 'include'
    })

    if (response.ok) {
      remove(chat.id)
      return
    }

    console.log(response)
  }

  const message = shorten(chat.message.content, 50)

  return (
    <div key={chat.id}>
      <div className='grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] gap-x-2'>
        <Link className='row-span-2' to={`/app/profile/${chat.user.id}`}>
          <Avatar publicId={chat.user.avatar} />
        </Link>
        <Link
          className='font-semibold text-2xl'
          to={`/app/profile/${chat.user.id}`}
        >
          {chat.user.display}
        </Link>
        <div className='flex items-start'>
          <Link
            className='self-start rounded-l-xl bg-gray-100 px-4 py-1 font-semibold dark:bg-zinc-700'
            to={`/app/message/${chat.user.id}`}
          >
            Message
          </Link>
          <button onClick={hideChat} type='button'>
            <XIcon
              className='rounded-r-xl bg-gray-50 p-1 text-red-400 dark:bg-zinc-800'
              size={32}
            />
          </button>
        </div>
        <Link
          className='col-span-2 text-gray-800 text-lg'
          to={`/app/message/${chat.user.id}`}
        >
          {message}
        </Link>
      </div>
    </div>
  )
}

export default ChatListItem
