import { type FunctionComponent, useState } from 'react'
import { DeleteContext } from '../../hooks/delete'
import useFetch from '../../hooks/fetch'
import { BACKEND_URL } from '../../lib/variables'
import type { SortType } from '../../types/app'
import type { PostData } from '../../types/data'
import Feed from '../post/Feed'
import Sort from '../post/Sort'

interface Props {
  id: string
}

const ProfileFeed: FunctionComponent<Props> = ({ id }) => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [sort, setSort] = useState<SortType>('recent')

  const path = `${BACKEND_URL}/user/${id}/post?sort=${sort}`
  useFetch(setPosts, path, sort)

  async function deletePost(id: string) {
    const response = await fetch(`${BACKEND_URL}/post/${id}`, {
      credentials: 'include',
      method: 'delete'
    })

    if (response.ok) {
      const filtered = posts.filter((p) => p.id !== id)
      setPosts(filtered)
    }
  }

  return (
    <DeleteContext.Provider value={{ post: deletePost }}>
      <Sort setSort={setSort} sort={sort} />
      <Feed posts={posts} user={true} />
    </DeleteContext.Provider>
  )
}

export default ProfileFeed
