import { type FunctionComponent, useState } from 'react'
import { useLoaderData, useNavigate, useOutletContext } from 'react-router'
import useFeed from '../../hooks/feed'
import { BACKEND_URL } from '../../lib/variables'
import type { AppContext, SortType } from '../../types/app'
import type { CommentData, PostData } from '../../types/data'
import Content from '../general/Content'
import Comment from './Comment'
import Post from './Post'
import Sort from './Sort'

const SinglePost: FunctionComponent = () => {
  const { self } = useOutletContext<AppContext>()
  const post = useLoaderData<PostData>()
  const [sort, setSort] = useState<SortType>('recent')
  const [comments, setComments] = useState<CommentData[]>([])
  const [count, setCount] = useState(post.commentCount)

  const cursor = comments.at(-1)?.id || ''
  const [loader, sentinel] = useFeed(
    setComments,
    10,
    `/comment/${post.id}`,
    cursor,
    { sort }
  )

  function success(data: CommentData) {
    setComments([data, ...comments])
    setCount(count + 1)
  }

  const deleteComment = async (id: string) => {
    const response = await fetch(
      `${BACKEND_URL}/comment/${id}?post=${post.id}`,
      { credentials: 'include', method: 'delete' }
    )

    if (response.ok) {
      const index = comments.findIndex((r) => r.id === id)
      const sliced = comments.slice()
      sliced[index].author = null
      sliced[index].content = null
      setComments(sliced)
      setCount(count - 1)
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

  const commentForm = self && (
    <Content
      label='Comment'
      path={`/comment/${post.id}`}
      placeholder='Add a comment...'
      success={success}
    />
  )

  const first = comments.slice(0, -3)
  const last = comments.slice(-3)

  return (
    <>
      <Post
        commentCount={count}
        deleter={post.authorId === self?.id && deletePost}
        post={post}
      />
      {commentForm}
      <Sort setSort={setSort} sort={sort} />
      {comments.length > 0 && (
        <div className='flex flex-col gap-4'>
          {first.map((c) => (
            <Comment
              comment={c}
              deleter={deleteComment}
              key={c.id}
              layer={0}
              sort={sort}
            />
          ))}
          <div className='-my-2' ref={sentinel} />
          {last.map((c) => (
            <Comment
              comment={c}
              deleter={deleteComment}
              key={c.id}
              layer={0}
              sort={sort}
            />
          ))}
        </div>
      )}
      {comments.length === 0 ? <h2>No comments</h2> : loader}
    </>
  )
}

export default SinglePost
