import type { FunctionComponent } from 'react'
import type { MessageData } from '../../types/data'

interface Props {
  message: MessageData
}

const Message: FunctionComponent<Props> = ({ message }) => (
  <div
    className={`${message.sent ? 'self-end bg-blue-200' : 'self-start bg-gray-200'} rounded-xl px-4 py-2`}
    key={message.id}
  >
    {message.content}
  </div>
)

export default Message
