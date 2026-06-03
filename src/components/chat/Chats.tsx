import { ChatSlashIcon } from '@phosphor-icons/react'
import { type FunctionComponent, useState } from 'react'
import { useLoaderData } from 'react-router'
import type { ChatDataMinimal } from '../../types/data'
import ChatListItem from './ChatList'

const Chats: FunctionComponent = () => {
  const [chats, setChats] = useState(useLoaderData<ChatDataMinimal[]>())

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

  function remove(id: string) {
    const filtered = chats.filter((chat) => chat.id !== id)
    setChats(filtered)
  }

  return (
    <div className='flex flex-col gap-4'>
      {chats.map((c) => (
        <ChatListItem chat={c} key={c.id} remove={remove} />
      ))}
    </div>
  )
}

export default Chats
