import { type FunctionComponent, useState } from 'react'
import useDebounce from '../../hooks/debounce'
import { DeleteContext } from '../../hooks/delete'
import useFetch from '../../hooks/fetch'
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
  const debouncedSearch = useDebounce(search, 300)

  const path = `${BACKEND_URL}/post?sort=${sort}&search=${debouncedSearch}`
  useFetch(setPosts, path, sort, debouncedSearch)

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
    <>
      <div className='flex gap-4'>
        <Search search={search} setSearch={setSearch} />
        {search.length === 0 && <Sort setSort={setSort} sort={sort} />}
      </div>
      <DeleteContext.Provider value={{ post: deletePost }}>
        <Feed posts={posts} user={false} />
      </DeleteContext.Provider>
    </>
  )
}

export default FeedMain
