import {
  type FunctionComponent,
  type MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react'
import { useLoaderData, useOutletContext } from 'react-router'
import { backendUrl } from '../../lib/variables'
import type { AppContext } from '../../types/app'
import type { PostData, ProfileData } from '../../types/data'
import Feed from '../post/Feed'
import Profile from './Profile'

const ProfileFeed: FunctionComponent = () => {
  const { self, setSelf } = useOutletContext<AppContext>()
  const user = useLoaderData<ProfileData>()
  const [posts, setPosts] = useState<PostData[] | null>(null)
  const [followed, setFollowed] = useState(user.followed)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`${backendUrl}/user/${user.id}/post`, {
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
    user.id
  ])

  const changeFollow: MouseEventHandler = async () => {
    const changed = !followed
    setFollowed(changed)

    if (abortRef.current) {
      abortRef.current.abort()
    }

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch(`${backendUrl}/user/${user.id}`, {
        method: changed ? 'put' : 'delete',
        credentials: 'include',
        signal: controller.signal
      })
      if (!response.ok) {
        throw new Error('Failed to follow user.')
      }
      const follows = self.follows
      setSelf({
        ...self,
        follows: changed ? follows + 1 : follows - 1
      })
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      setFollowed(!changed)
      console.log('Failed to follow user.')
    }
  }

  const follow = (
    <button
      className='self-start rounded-full bg-gray-200 px-10 py-2 text-center'
      onClick={changeFollow}
      type='button'
    >
      {followed ? 'Following' : 'Follow'}
    </button>
  )

  return (
    <div className='flex flex-col'>
      <Profile data={user} followed={followed}>
        {follow}
      </Profile>
      {posts ? <Feed data={posts} user={true} /> : null}
    </div>
  )
}

export default ProfileFeed
