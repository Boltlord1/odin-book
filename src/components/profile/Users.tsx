import { type FunctionComponent, useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import useDebounce from '../../hooks/debounce'
import useFetch from '../../hooks/fetch'
import { BACKEND_URL } from '../../lib/variables'
import type { AppContext } from '../../types/app'
import type { UserExtraData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Search from '../post/Search'

const Users: FunctionComponent = () => {
  const [users, setUsers] = useState<UserExtraData[]>([])
  const [search, setSearch] = useState('')
  const { self } = useOutletContext<AppContext>()
  const debouncedSearch = useDebounce(search, 300)

  const path = `${BACKEND_URL}/user?search=${debouncedSearch}`
  useFetch(setUsers, path, debouncedSearch)

  return (
    <>
      <div className='flex gap-4'>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className='flex flex-col gap-4'>
        {users.map((u) => (
          <div key={u.id}>
            <div className='flex gap-2'>
              <Link to={`/app/profile/${u.id}`}>
                <Avatar publicId={u.avatar} />
              </Link>
              <div className='flex flex-1 flex-col items-start'>
                <Link to={`/app/profile/${u.id}`}>
                  <h3 className='font-semibold text-2xl'>{u.display}</h3>
                </Link>
                <div className='grid grid-cols-[minmax(100px,1fr)_minmax(100px,1fr)]'>
                  <p>
                    {u.followers} Follower{u.followers === 1 ? '' : 's'}
                  </p>
                  <p>
                    {u.posts} Post{u.posts === 1 ? '' : 's'}
                  </p>
                </div>
              </div>
              {self.id !== u.id && (
                <Link
                  className='self-start rounded-xl bg-gray-100 px-4 py-2 font-semibold'
                  to={`/app/chat/${u.id}`}
                >
                  Message
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Users
