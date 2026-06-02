import { ChatCircleIcon } from '@phosphor-icons/react'
import { type FunctionComponent, useState } from 'react'
import { Link } from 'react-router'
import { DeleteContext } from '../../hooks/delete'
import { BACKEND_URL } from '../../lib/variables'
import type { CommentData, ReplyData } from '../../types/data'
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
  const [replies, setReplies] = useState<ReplyData[]>([])
  const [count, setCount] = useState(comment.replyCount)
  const [replyOpen, setReply] = useState(false)

  const reply = (
    <Icon Icon={ChatCircleIcon} iconProps={{ weight: 'bold' }} text={count} />
  )

  const author = comment.author ? (
    <Link to={`/app/profile/${comment.author.id}`}>
      <h3 className='font-semibold leading-none'>{comment.author.display}</h3>
    </Link>
  ) : (
    <h3 className='font-semibold leading-none'>Deleted</h3>
  )

  function success(data: ReplyData) {
    setReplies([...replies, data])
    setCount(count + 1)
  }

  async function deleteReply(id: string) {
    const response = await fetch(`${BACKEND_URL}/reply/${id}`, {
      credentials: 'include',
      method: 'delete'
    })

    if (response.ok) {
      const filtered = replies.filter((r) => r.id !== id)
      setCount(count - 1)
      setReplies(filtered)
    }
  }

  async function getMore() {
    const cursor = replies.at(-1)?.id || ''
    const response = await fetch(
      `${BACKEND_URL}/reply/${comment.id}?cursor=${cursor}`
    )

    if (response.ok) {
      const json = await response.json()
      setReplies([...replies, ...json])
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
            likes={comment.likeCount}
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
            path={`/reply/${comment.id}?post=${comment.postId}`}
            placeholder='Add a reply...'
            success={success}
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
        {count > replies.length && (
          <button className='text-left' onClick={getMore} type='button'>
            Load replies ({count - replies.length})
          </button>
        )}
      </div>
    </div>
  )
}

export default Comment
