import { type FunctionComponent, useState } from 'react'
import useFeed from '../../hooks/feed'
import type { SortType } from '../../types/app'
import type { PostData } from '../../types/data'
import Feed from './Feed'
import Search from './Search'
import Sort from './Sort'

const FeedMain: FunctionComponent = () => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [sort, setSort] = useState<SortType>('recent')
  const [search, setSearch] = useState('')

  const cursor = posts.at(-1)?.id || ''
  const [loader, sentinel] = useFeed(setPosts, 10, '/post', cursor, {
    sort,
    search
  })

  const first = posts.slice(0, -3)
  const last = posts.slice(-3)

  return (
    <>
      <div className='flex gap-4'>
        <Search search={search} setSearch={setSearch} />
        {search.length === 0 && <Sort setSort={setSort} sort={sort} />}
      </div>
      <Feed posts={first} user={false} />
      {posts.length > 1 && <div className='-my-2' ref={sentinel} />}
      <Feed posts={last} user={false} />
      {loader}
    </>
  )
}

export default FeedMain
