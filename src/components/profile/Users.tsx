import { type FunctionComponent, useState } from 'react'
import { useOutletContext } from 'react-router'
import useFeed from '../../hooks/feed'
import type { AppContext } from '../../types/app'
import type { UserData } from '../../types/data'
import Search from '../post/Search'
import User from './User'

const Users: FunctionComponent = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [search, setSearch] = useState('')
  const { self } = useOutletContext<AppContext>()

  const cursor = users.at(-1)?.id || ''
  const [loader, sentinel] = useFeed(setUsers, '/user', cursor, { search })

  const first = users.slice(0, -3)
  const last = users.slice(-3)

  return (
    <>
      <div className='flex gap-4'>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className='flex flex-col gap-4'>
        {first.map((u) => (
          <User data={u} key={u.id} selfId={self.id} />
        ))}
        <div ref={sentinel} />
        {last.map((u) => (
          <User data={u} key={u.id} selfId={self.id} />
        ))}
      </div>
      {loader}
    </>
  )
}

export default Users
