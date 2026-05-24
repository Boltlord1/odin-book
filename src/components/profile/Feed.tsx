import { type FunctionComponent, useState } from 'react'
import { DeleteContext } from '../../hooks/delete'
import useFeed from '../../hooks/feed'
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

  const cursor = posts.at(-1)?.id || ''
  const [loader, sentinel] = useFeed(setPosts, `/user/${id}/post`, cursor, {
    sort
  })

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

  const first = posts.slice(0, -3)
  const last = posts.slice(-3)

  return (
    <>
      <Sort setSort={setSort} sort={sort} />
      <DeleteContext.Provider value={{ post: deletePost }}>
        <Feed posts={first} user={true} />
        {posts.length > 1 && <div className='-my-2' ref={sentinel} />}
        <Feed posts={last} user={true} />
      </DeleteContext.Provider>
      {loader}
    </>
  )
}

export default ProfileFeed
