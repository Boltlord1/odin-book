import { type FunctionComponent, useState } from 'react'
import { useLoaderData } from 'react-router'
import useFetch from '../../hooks/fetch'
import { backendUrl } from '../../lib/variables'
import type { Sorts } from '../../types/app'
import type { CommentData, PostData } from '../../types/data'
import Content from '../general/Content'
import Comment from './Comment'
import Post from './Post'
import Sort from './Sort'

const SinglePost: FunctionComponent = () => {
  const post = useLoaderData<PostData>()
  const [sort, setSort] = useState<Sorts>('recent')
  const [comments, setComments] = useState<CommentData[]>([])

  const path = `${backendUrl}/comment/${post.id}?sort=${sort}`
  useFetch(setComments, path, sort)

  const updateComment = (comment: CommentData) =>
    setComments([comment, ...comments])

  return (
    <>
      <Post post={post} />
      <Content
        absolute
        path={path}
        placeholder='comment'
        update={updateComment}
      />
      <Sort setSort={setSort} sort={sort} />
      {comments.length > 0 && (
        <div className='flex flex-col gap-2'>
          {comments.map((c) => (
            <Comment comment={c} key={c.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default SinglePost
