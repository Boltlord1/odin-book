import { type FunctionComponent, useState } from 'react'
import useFetch from '../../hooks/fetch'
import { BACKEND_URL } from '../../lib/variables'
import type { Sorts } from '../../types/app'
import type { PostData } from '../../types/data'
import Feed from '../post/Feed'
import Sort from '../post/Sort'

interface Props {
  id: string
}

const ProfileFeed: FunctionComponent<Props> = ({ id }) => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [sort, setSort] = useState<Sorts>('recent')

  const path = `${BACKEND_URL}/user/${id}/post?sort=${sort}`
  useFetch(setPosts, path, sort)

  return (
    <>
      <Sort setSort={setSort} sort={sort} />
      <Feed posts={posts} user={true} />
    </>
  )
}

export default ProfileFeed
