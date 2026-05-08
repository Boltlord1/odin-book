import { type FunctionComponent, useEffect, useState } from 'react'
import { options } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import type { PostData } from '../../types/data'
import Feed from '../post/Feed'
import Sort from '../post/Sort'

interface Props {
  id: string
}

const ProfileFeed: FunctionComponent<Props> = ({ id }) => {
  const [posts, setPosts] = useState<PostData[]>([])

  const path = `${backendUrl}/user/${id}/post`
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(path, options)

      if (response.ok) {
        const json: PostData[] = await response.json()
        setPosts(json)
        return
      }

      console.log(response)
    }
    getPosts()
  }, [path])

  return (
    <div>
      <Sort path={path} setSort={setPosts} />
      <Feed posts={posts} user={true} />
    </div>
  )
}

export default ProfileFeed
