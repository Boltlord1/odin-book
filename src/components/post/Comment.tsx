import { ChatCircleIcon, PlusCircleIcon } from '@phosphor-icons/react'
import { type FunctionComponent, useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { BACKEND_URL } from '../../lib/variables'
import type { AppContext, SortType } from '../../types/app'
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
  const { self } = useOutletContext<AppContext>()
  const [children, setChildren] = useState(comment.children)
  const [childCount, setChildCount] = useState(comment.childCount)
  const [replyOpen, setReply] = useState(false)
  const [collapsed, setCollapsed] = useState(comment.collapsed)

  useEffect(() => {
    setChildren(comment.children)
  }, [comment.children])

  function success(data: CommentData) {
    setReply(!replyOpen)
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

  function collapse() {
    comment.collapsed = !collapsed
    setCollapsed(!collapsed)
  }

  const content = comment.content ? (
    <p className='wrap-break-word'>{comment.content}</p>
  ) : (
    <p>Comment was deleted</p>
  )

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

  const replyForm = (
    <Content
      label='Reply'
      path={`/comment/${comment.postId}?post=${comment.postId}&parent=${comment.id}`}
      placeholder='Add a reply...'
      success={success}
    />
  )

  if (collapsed) {
    return (
      <div className='flex gap-2'>
        <button
          className='flex w-8 justify-center'
          onClick={collapse}
          type='button'
        >
          <PlusCircleIcon size={20} />
        </button>
        <div className='flex flex-1 flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <div className='flex gap-4'>
              {author}
              <button
                className='flex-1 bg-linear-to-b from-gray-200 via-gray-100 to-gray-200'
                onClick={collapse}
                type='button'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-[auto_1fr] gap-x-2 gap-y-4'>
      <button
        className='row-start-1 grid grid-rows-subgrid'
        onClick={collapse}
        style={{ gridRowEnd: children.length + 2 }}
        type='button'
      >
        <div className='flex flex-col items-end'>
          <Avatar publicId={comment.author?.avatar} />
          {children.length > 0 && <div className='w-1/2 flex-1 border-l' />}
        </div>
        {children.map((c, i) => (
          <div className='flex h-full flex-col items-end' key={`line-${c.id}`}>
            <div className='-mt-4 -mr-4 h-6.5 w-[calc(50%+16px)] border-b border-l' />
            {i !== children.length - 1 && (
              <div className='w-1/2 flex-1 border-l' />
            )}
          </div>
        ))}
      </button>
      <div className='col-start-2 flex flex-col gap-2'>
        <div className='flex gap-4'>
          {author}
          <button
            className='flex-1 bg-linear-to-b from-gray-100 via-gray-50 to-gray-100'
            onClick={collapse}
            type='button'
          />
        </div>
        {content}
        <div className='flex gap-2'>
          <Like
            disabled={!comment.author}
            initial={comment.liked}
            likes={comment.likeCount}
            path={`/like/comment/${comment.id}`}
          />
          {comment.author ? (
            <button
              onClick={() => setReply(!!self && !replyOpen)}
              type='button'
            >
              {reply}
            </button>
          ) : (
            reply
          )}
          {self?.id === comment.authorId && (
            <Delete confirm={() => deleter(comment.id)} msg='this comment' />
          )}
        </div>
        {replyOpen && replyForm}
      </div>
      {children.length > 0 &&
        children.map((c) => (
          <Comment
            comment={c}
            deleter={deleteComment}
            key={c.id}
            layer={layer + 1}
            sort={sort}
          />
        ))}
      {childCount > children.length && (
        <button className='text-left' onClick={getMore} type='button'>
          Load more ({comment.childCount - children.length})
        </button>
      )}
    </div>
  )
}

export default Comment
