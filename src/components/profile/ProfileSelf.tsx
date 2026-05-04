import { type FunctionComponent, useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { backendUrl } from '../../lib/variables'
import type { AppContext } from '../../types/app'
import type { PostData } from '../../types/data'
import Feed from '../post/Feed'
import Profile from './Profile'

const ProfileSelf: FunctionComponent = () => {
  const { self } = useOutletContext<AppContext>()
  const [posts, setPosts] = useState<PostData[] | null>(null)

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`${backendUrl}/user/${self.id}/post`, {
        credentials: 'include'
      })

      if (response.ok) {
        const json: PostData[] = await response.json()
        setPosts(json)
        return
      }

      console.log(response)
    }
    getPosts()
  }, [
    self.id
  ])

  const settings = (
    <Link
      className='self-start rounded-full bg-gray-200 px-10 py-2 text-center'
      to={'/app/account'}
    >
      Settings
    </Link>
  )

  return (
    <div className='flex flex-col'>
      <Profile data={self}>{settings}</Profile>
      {posts ? <Feed data={posts} user={true} /> : null}
    </div>
  )
}

export default ProfileSelf
