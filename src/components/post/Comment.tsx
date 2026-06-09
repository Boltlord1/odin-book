import { ChatCircleIcon } from '@phosphor-icons/react'
import { type FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { BACKEND_URL } from '../../lib/variables'
import type { SortType } from '../../types/app'
import type { CommentData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Content from '../general/Content'
import Delete from '../general/Delete'
import Icon from '../general/Icon'
import Like from '../general/Like'

interface Props {
  comment: CommentData
  deleter: (id: string) => void
  layer: number
  sort: SortType
}

const Comment: FunctionComponent<Props> = ({
  comment,
  layer,
  sort,
  deleter
}) => {
  const [children, setChildren] = useState(comment.children)
  const [childCount, setChildCount] = useState(comment.childCount)
  const [replyOpen, setReply] = useState(false)

  useEffect(() => {
    setChildren(comment.children)
  }, [comment.children])

  function success(data: CommentData) {
    setChildren([data, ...children])
    setChildCount(childCount + 1)
  }

  async function getMore() {
    const cursor = children.at(-1)?.id
    const response = await fetch(
      `${BACKEND_URL}/comment/${comment.id}/reply?cursor=${cursor}&sort=${sort}`,
      { credentials: 'include' }
    )

    if (response.ok) {
      const json: CommentData[] = await response.json()
      setChildren([...children, ...json])
    }
  }

  const reply = (
    <Icon Icon={ChatCircleIcon} iconProps={{ weight: 'bold' }} text={'Reply'} />
  )

  const author = comment.author ? (
    <Link to={`/app/profile/${comment.author.id}`}>
      <h3 className='font-semibold leading-none'>{comment.author.display}</h3>
    </Link>
  ) : (
    <h3 className='font-semibold leading-none'>Deleted</h3>
  )

  const deleteComment = async (id: string) => {
    const response = await fetch(
      `${BACKEND_URL}/comment/${id}?post=${comment.postId}&parent=${comment.id}`,
      { credentials: 'include', method: 'delete' }
    )

    if (response.ok) {
      const index = children.findIndex((r) => r.id === id)
      const sliced = children.slice()
      sliced[index].author = null
      sliced[index].content = null
      setChildren(sliced)
      setChildCount(childCount - 1)
    }
  }

  return (
    <div
      className='flex flex-1 flex-col gap-2'
      style={{ marginLeft: layer * 4 }}
    >
      <Avatar publicId={comment.author?.avatar} />
      <div className='flex flex-col gap-1'>
        {author}
        {comment.content ? (
          <p className='wrap-break-word'>{comment.content}</p>
        ) : (
          <p>Comment was deleted</p>
        )}
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
        <Delete confirm={() => deleter(comment.id)} msg='this comment' />
      </div>
      {replyOpen && (
        <Content
          label='Reply'
          path={`/comment/${comment.postId}?post=${comment.postId}&parent=${comment.id}`}
          placeholder='Add a reply...'
          success={success}
        />
      )}
      {children.length > 0 && (
        <div className='mt-2 flex flex-col gap-2'>
          {children.map((c) => (
            <Comment
              comment={c}
              deleter={deleteComment}
              key={c.id}
              layer={layer + 1}
              sort={sort}
            />
          ))}
        </div>
      )}
      {childCount > children.length && (
        <button className='text-left' onClick={getMore} type='button'>
          Load more ({comment.childCount - children.length})
        </button>
      )}
    </div>
  )
}

export default Comment
