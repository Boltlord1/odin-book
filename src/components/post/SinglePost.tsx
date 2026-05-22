import { type FunctionComponent, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { DeleteContext } from '../../hooks/delete'
import useFetch from '../../hooks/fetch'
import { reverseMap } from '../../lib/array'
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

  const path = `${BACKEND_URL}/comment/${post.id}?sort=${sort}`
  useFetch(setComments, path, sort)

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

  return (
    <>
      <DeleteContext.Provider value={{ post: deletePost }}>
        <Post post={post} />
      </DeleteContext.Provider>
      <Content
        label='Comment'
        path={`/comment/${post.id}`}
        placeholder='Add a comment...'
        setState={setComments}
      />
      <Sort setSort={setSort} sort={sort} />
      {comments.length > 0 && (
        <DeleteContext.Provider value={{ comment: deleteComment }}>
          <div className='flex flex-col gap-4'>
            {reverseMap(comments, (c) => (
              <Comment comment={c} key={c.id} />
            ))}
          </div>
        </DeleteContext.Provider>
      )}
    </>
  )
}

export default SinglePost
