import { type FunctionComponent, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { DeleteContext } from '../../hooks/delete'
import useFeed from '../../hooks/feed'
import { BACKEND_URL } from '../../lib/variables'
import type { SortType } from '../../types/app'
import type { CommentData, PostData } from '../../types/data'
import Content from '../general/Content'
import Comment from './Comment'
import Post from './Post'
import Sort from './Sort'

const SinglePost: FunctionComponent = () => {
  const post = useLoaderData<PostData>()
  const [sort, setSort] = useState<SortType>('recent')
  const [comments, setComments] = useState<CommentData[]>([])
  const [count, setCount] = useState(post.commentCount)

  const cursor = comments.at(-1)?.id || ''
  const [loader, sentinel] = useFeed(
    setComments,
    `/comment/${post.id}`,
    cursor,
    { sort }
  )

  function success(data: CommentData) {
    setComments([data, ...comments])
    setCount(count + 1)
  }

  async function deleteComment(id: string) {
    const response = await fetch(`${BACKEND_URL}/comment/${id}`, {
      credentials: 'include',
      method: 'delete'
    })

    if (response.ok) {
      const index = comments.findIndex((r) => r.id === id)
      const sliced = comments.slice()
      sliced[index].author = null
      sliced[index].content = 'Comment was deleted.'
      setComments(sliced)
    }
  }

  const navigate = useNavigate()
  async function deletePost(id: string) {
    const response = await fetch(`${BACKEND_URL}/post/${id}`, {
      credentials: 'include',
      method: 'delete'
    })

    if (response.ok) {
      navigate('/app/post')
    }
  }

  const first = comments.slice(0, -3)
  const last = comments.slice(-3)

  return (
    <>
      <DeleteContext.Provider value={{ post: deletePost }}>
        <Post post={post} />
      </DeleteContext.Provider>
      <Content
        label='Comment'
        path={`/comment/${post.id}`}
        placeholder='Add a comment...'
        success={success}
      />
      <Sort setSort={setSort} sort={sort} />
      {comments.length > 0 && (
        <DeleteContext.Provider value={{ comment: deleteComment }}>
          <div className='flex flex-col gap-4'>
            {first.map((c) => (
              <Comment comment={c} key={c.id} />
            ))}
            <div ref={sentinel} />
            {last.map((c) => (
              <Comment comment={c} key={c.id} />
            ))}
          </div>
        </DeleteContext.Provider>
      )}
      {comments.length === 0 ? <h2>No comments</h2> : loader}
    </>
  )
}

export default SinglePost
