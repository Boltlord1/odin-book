import type { FunctionComponent } from 'react'
import type { PostData } from '../../types/data'
import Post from './Post'

interface Props {
  posts: PostData[]
  user: boolean
}

const Feed: FunctionComponent<Props> = ({ posts, user }) => (
  <div className='flex flex-col gap-4 py-4'>
    {posts.map((p) => (
      <Post feed={true} key={p.id} post={p} user={user} />
    ))}
  </div>
)

export default Feed
