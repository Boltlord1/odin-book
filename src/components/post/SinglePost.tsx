import { type FunctionComponent, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import { options } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import type { CommentData, PostData } from '../../types/data'
import Comment from './Comment'
import Form from './Form'
import Post from './Post'
import Sort from './Sort'

const SinglePost: FunctionComponent = () => {
  const post = useLoaderData<PostData>()
  const [comments, setComments] = useState<CommentData[]>([])

  const path = `${backendUrl}/comment/${post.id}`
  useEffect(() => {
    async function getComments() {
      const response = await fetch(path, options)
      if (response.ok) {
        const json = await response.json()
        setComments(json)
      }
    }
    getComments()
  }, [path])

  const updateComment = (comment: unknown) =>
    setComments([comment as CommentData, ...comments])

  return (
    <div className='flex flex-col gap-4 py-4'>
      <Post post={post} />
      <Form absolute path={path} placeholder='comment' update={updateComment} />
      <Sort path={path} setSort={setComments} />
      {comments.length > 0 && (
        <div className='flex flex-col gap-2'>
          {comments.map((c) => (
            <Comment comment={c} key={c.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SinglePost
