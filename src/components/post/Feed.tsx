import type { FunctionComponent } from 'react'
import { useLoaderData } from 'react-router'
import type { PostData } from '../../types/data'
import Post from './Post'

interface Props {
  data?: PostData[]
  user: boolean
}

const Feed: FunctionComponent<Props> = ({ data, user }) => {
  const loader = useLoaderData<PostData[]>()
  const posts = data ? data : loader

  return (
    <div className='flex flex-col gap-4 py-4'>
      {posts.map(p => (
        <Post feed={true} key={p.id} post={p} user={user} />
      ))}
    </div>
  )
}

export default Feed
