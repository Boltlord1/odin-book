import { type FunctionComponent, useState } from 'react'
import useDebounce from '../../hooks/debounce'
import useFetch from '../../hooks/fetch'
import { backendUrl } from '../../lib/variables'
import type { Sorts } from '../../types/app'
import type { PostData } from '../../types/data'
import Feed from './Feed'
import Search from './Search'
import Sort from './Sort'

const FeedMain: FunctionComponent = () => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [sort, setSort] = useState<Sorts>('recent')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const path = `${backendUrl}/post?sort=${sort}&search=${debouncedSearch}`
  useFetch(setPosts, path, sort, debouncedSearch)

  return (
    <>
      <div className='flex gap-4'>
        <Search search={search} setSearch={setSearch} />
        {search.length === 0 && <Sort setSort={setSort} sort={sort} />}
      </div>
      <Feed posts={posts} user={false} />
    </>
  )
}

export default FeedMain
