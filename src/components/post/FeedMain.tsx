import { type FunctionComponent, useState } from 'react'
import { DeleteContext } from '../../hooks/delete'
import useFeed from '../../hooks/feed'
import { BACKEND_URL } from '../../lib/variables'
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
  const [loader, sentinel] = useFeed(setPosts, '/post', cursor, {
    sort,
    search
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
      <div className='flex gap-4'>
        <Search search={search} setSearch={setSearch} />
        {search.length === 0 && <Sort setSort={setSort} sort={sort} />}
      </div>
      <DeleteContext.Provider value={{ post: deletePost }}>
        <Feed posts={first} user={false} />
        {posts.length > 1 && <div className='-my-2' ref={sentinel} />}
        <Feed posts={last} user={false} />
      </DeleteContext.Provider>
      {loader}
    </>
  )
}

export default FeedMain
