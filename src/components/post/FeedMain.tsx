import { type FunctionComponent, useState } from 'react'
import { useLoaderData } from 'react-router'
import { backendUrl } from '../../lib/variables'
import type { PostData } from '../../types/data'
import Feed from './Feed'
import Sort from './Sort'

const FeedMain: FunctionComponent = () => {
  const [posts, setPosts] = useState(useLoaderData<PostData[]>())
  const path = `${backendUrl}/post`

  return (
    <div className='py-2'>
      <Sort path={path} setSort={setPosts} />
      <Feed posts={posts} user={false} />
    </div>
  )
}

export default FeedMain
