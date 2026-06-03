import { type FunctionComponent, useState } from 'react'
import { Link, useLoaderData, useOutletContext } from 'react-router'
import useFeed from '../../hooks/feed'
import { reverseMap } from '../../lib/array'
import type { AppContext } from '../../types/app'
import type { ChatData, MessageData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Content from '../general/Content'
import Message from './Message'

const Chat: FunctionComponent = () => {
  const { self } = useOutletContext<AppContext>()
  const chat = useLoaderData<ChatData>()
  const [messages, setMessages] = useState<MessageData[]>([])

  const cursor = messages.at(-1)?.id || ''
  useFeed(setMessages, `/chat/${chat.id}`, cursor, {})

  function success(data: MessageData) {
    setMessages([data, ...messages])
  }

  return (
    <>
      <Link className='flex gap-2' to={`/app/profile/${chat.user.id}`}>
        <Avatar publicId={chat.user.avatar} />
        <span className='font-semibold text-2xl'>{chat.user.display}</span>
      </Link>
      <div className='flex flex-1 flex-col justify-end gap-2'>
        {reverseMap(messages, (m) => (
          <Message key={m.id} message={m} sent={m.authorId === self.id} />
        ))}
      </div>
      <Content
        label='Message'
        path={`/chat/${chat.id}`}
        placeholder='message'
        success={success}
      />
    </>
  )
}

export default Chat
