import { type FunctionComponent, useState } from 'react'
import { Link, useLoaderData } from 'react-router'
import { reverseMap } from '../../lib/array'
import { BACKEND_URL } from '../../lib/variables'
import type { ChatData, MessageData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Form from '../general/Content'
import Message from './Message'

const Chat: FunctionComponent = () => {
  const chat = useLoaderData<ChatData>()
  const [messages, setMessages] = useState(chat.messages)

  const updateMessages = (message: unknown) =>
    setMessages([message as MessageData, ...messages])

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
      <Form
        path={`${BACKEND_URL}/chat/${chat.id}`}
        placeholder='message'
        update={updateMessages}
      />
    </>
  )
}

export default Chat
