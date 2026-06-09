import { type FunctionComponent, useState } from 'react'
import useFeed from '../../hooks/feed'
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
  const [loader, sentinel] = useFeed(setPosts, 10, `/user/${id}/post`, cursor, {
    sort
  })

  const first = posts.slice(0, -3)
  const last = posts.slice(-3)

  return (
    <>
      <Sort setSort={setSort} sort={sort} />
      <Feed posts={first} user={true} />
      {posts.length > 1 && <div className='-my-2' ref={sentinel} />}
      <Feed posts={last} user={true} />
      {loader}
    </>
  )
}

export default ProfileFeed
