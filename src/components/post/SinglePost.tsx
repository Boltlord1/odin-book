import {
  type FunctionComponent,
  type SubmitEventHandler,
  useEffect,
  useState
} from 'react'
import { useLoaderData } from 'react-router'
import { jsonOptions, options } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import type { CommentData, PostData } from '../../types/data'
import Comment from './Comment'
import CommentForm from './CommentForm'
import Post from './Post'
import Sort from './Sort'

const SinglePost: FunctionComponent = () => {
  const post = useLoaderData<PostData>()
  const [comments, setComments] = useState<CommentData[]>([])

  const path = `${backendUrl}/post/${post.id}/comment`
  useEffect(() => {
    async function getComments() {
      const response = await fetch(path, options)
      if (response.ok) {
        const json = await response.json()
        setComments(json)
      }
    }
    getComments()
  }, [
    path
  ])

  const submitComment: SubmitEventHandler = async event => {
    event.preventDefault()

    const form = event.target
    const response = await fetch(
      `http://localhost:3000/post/${post.id}`,
      jsonOptions(form)
    )

    if (response.ok) {
      form.reset()
      const json: CommentData = await response.json()
      const updated = comments.slice()
      updated.push(json)
      setComments(updated)
    }
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <Post feed={false} post={post} user={false} />
      <CommentForm handleSubmit={submitComment} />
      <Sort path={path} setSort={setComments} />
      {comments.map(c => (
        <Comment data={c} key={c.id} />
      ))}
    </div>
  )
}

export default SinglePost
