import { type FunctionComponent, useState } from 'react'
import { Link, useLoaderData } from 'react-router'
import { reverseMap } from '../../lib/array'
import type { ChatData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Content from '../general/Content'
import Message from './Message'

const Chat: FunctionComponent = () => {
  const chat = useLoaderData<ChatData>()
  const [messages, setMessages] = useState(chat.messages)

  return (
    <>
      <Link className='flex gap-2' to={`/app/profile/${chat.user.id}`}>
        <Avatar publicId={chat.user.avatar} />
        <span className='font-semibold text-2xl'>{chat.user.display}</span>
      </Link>
      <div className='flex flex-1 flex-col justify-end gap-2'>
        {reverseMap(messages, (m) => (
          <Message key={m.id} message={m} />
        ))}
      </div>
      <Content
        label='Message'
        path={`/chat/${chat.id}`}
        placeholder='message'
        setState={setMessages}
      />
    </>
  )
}

export default Chat
