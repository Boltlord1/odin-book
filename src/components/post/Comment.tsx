import { ChatCircleIcon } from '@phosphor-icons/react'
import { type FunctionComponent, type MouseEventHandler, useState } from 'react'
import { Link } from 'react-router'
import type { CommentData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Content from '../general/Content'
import Icon from '../general/Icon'
import Like from '../general/Like'
import Reply from './Reply'

interface Props {
  comment: CommentData
}

const Comment: FunctionComponent<Props> = ({ comment }) => {
  const [replies, setReplies] = useState(comment.replies)
  const [replyOpen, setReply] = useState(false)

  const openReply: MouseEventHandler = () => setReply(!replyOpen)

  const reply = (
    <Icon
      divProps={{ onClick: openReply }}
      Icon={ChatCircleIcon}
      iconProps={{ weight: 'bold' }}
      text={comment.replies.length}
    />
  )

  const author = (
    <Link to={`/app/profile/${comment.author.id}`}>
      <h3 className='mb-1 font-semibold leading-none'>
        {comment.author.display}
      </h3>
    </Link>
  )

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <Avatar publicId={comment.author.avatar} />
        <div className='mb-1 flex-1'>
          {author}
          <p className='wrap-anywhere'>{comment.content}</p>
        </div>
        <div className='flex gap-2'>
          {reply}
          <Like
            initial={comment.liked}
            likes={comment.likes}
            path={`/like/comment/${comment.id}`}
          />
        </div>
      </div>
      {replyOpen && (
        <Content
          label='Reply'
          path={`/reply/${comment.id}`}
          placeholder='reply'
          setState={setReplies}
        />
      )}
      {replies.length > 0 && (
        <div className='ml-8 flex flex-col gap-2'>
          {replies.map((r) => (
            <Reply key={r.id} reply={r} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
