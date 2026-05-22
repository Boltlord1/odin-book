import { ChatCircleIcon } from '@phosphor-icons/react'
import { type FunctionComponent, useState } from 'react'
import { Link } from 'react-router'
import { DeleteContext } from '../../hooks/delete'
import { BACKEND_URL } from '../../lib/variables'
import type { CommentData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Content from '../general/Content'
import Delete from '../general/Delete'
import Icon from '../general/Icon'
import Like from '../general/Like'
import Reply from './Reply'

interface Props {
  comment: CommentData
}

const Comment: FunctionComponent<Props> = ({ comment }) => {
  const [replies, setReplies] = useState(comment.replies)
  const [replyOpen, setReply] = useState(false)

  const reply = (
    <Icon
      Icon={ChatCircleIcon}
      iconProps={{ weight: 'bold' }}
      text={comment.replies.length}
    />
  )

  const author = comment.author ? (
    <Link to={`/app/profile/${comment.author.id}`}>
      <h3 className='font-semibold leading-none'>{comment.author.display}</h3>
    </Link>
  ) : (
    <h3 className='font-semibold leading-none'>Deleted</h3>
  )

  async function deleteReply(id: string) {
    const response = await fetch(`${BACKEND_URL}/reply/${id}`, {
      credentials: 'include',
      method: 'delete'
    })

    if (response.ok) {
      const filtered = replies.filter((r) => r.id !== id)
      setReplies(filtered)
    }
  }

  return (
    <div className='flex gap-2'>
      <Avatar publicId={comment.author?.avatar} />
      <div className='flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-1'>
          {author}
          <p className='wrap-break-word'>{comment.content}</p>
        </div>
        <div className='flex gap-2'>
          <Like
            disabled={!comment.author}
            initial={comment.liked}
            likes={comment.likes}
            path={`/like/comment/${comment.id}`}
          />
          {comment.author ? (
            <button onClick={() => setReply(!replyOpen)} type='button'>
              {reply}
            </button>
          ) : (
            reply
          )}
          <Delete id={comment.id} type='comment' userId={comment.author?.id} />
        </div>
        {replyOpen && (
          <Content
            label='Reply'
            path={`/reply/${comment.id}`}
            placeholder='Add a reply...'
            setState={setReplies}
          />
        )}
        {replies.length > 0 && (
          <DeleteContext.Provider value={{ reply: deleteReply }}>
            <div className='mt-2 flex flex-col gap-2'>
              {replies.map((r) => (
                <Reply key={r.id} reply={r} />
              ))}
            </div>
          </DeleteContext.Provider>
        )}
      </div>
    </div>
  )
}

export default Comment
