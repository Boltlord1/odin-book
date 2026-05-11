import {
  type FunctionComponent,
  type MouseEventHandler,
  useRef,
  useState
} from 'react'
import { Link, useLoaderData, useOutletContext } from 'react-router'
import { toggleOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import type { AppContext } from '../../types/app'
import type { ProfileData } from '../../types/data'
import ProfileFeed from './Feed'
import Profile from './Profile'

const Other: FunctionComponent = () => {
  const { self, setSelf } = useOutletContext<AppContext>()
  const user = useLoaderData<ProfileData>()

  const [followed, setFollowed] = useState(user.followed)
  const abortRef = useRef<AbortController | null>(null)

  const changeFollow: MouseEventHandler = async () => {
    const changed = !followed
    setFollowed(changed)

    if (abortRef.current) {
      abortRef.current.abort()
    }

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch(
        `${backendUrl}/follow/${user.id}`,
        toggleOptions(changed, controller.signal)
      )
      if (!response.ok) {
        throw new Error('Failed to follow user.')
      }
      const follows = self.following
      setSelf({ ...self, following: changed ? follows + 1 : follows - 1 })
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
      className='flex-1 rounded-full bg-gray-200 px-10 py-2 text-center'
      onClick={changeFollow}
      type='button'
    >
      {followed ? 'Following' : 'Follow'}
    </button>
  )

  const message = (
    <Link
      className='flex-1 rounded-full bg-gray-200 px-10 py-2 text-center'
      to={`/app/chat/${user.id}`}
    >
      Message
    </Link>
  )

  return (
    <>
      <Profile data={user} followed={followed}>
        {follow}
        {message}
      </Profile>
      <ProfileFeed id={user.id} />
    </>
  )
}

export default Other
