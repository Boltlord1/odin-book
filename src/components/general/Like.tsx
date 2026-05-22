import { HeartIcon } from '@phosphor-icons/react'
import {
  type FunctionComponent,
  type MouseEventHandler,
  useRef,
  useState
} from 'react'
import { toggleOptions } from '../../lib/fetch'
import { BACKEND_URL } from '../../lib/variables'
import Icon from './Icon'

interface Props {
  disabled?: boolean
  initial: boolean
  likes: number
  path: string
}

const Like: FunctionComponent<Props> = ({ initial, likes, path, disabled }) => {
  const [liked, setLiked] = useState(initial)
  const abortRef = useRef<AbortController | null>(null)

  const icon = (
    <Icon
      Icon={HeartIcon}
      iconProps={{
        className: `${liked ? 'liked' : 'like'}`,
        weight: liked ? 'fill' : 'bold'
      }}
      text={liked ? likes + 1 : likes}
    />
  )

  if (disabled) {
    return icon
  }

  const changeLiked: MouseEventHandler = async () => {
    const changed = !liked
    setLiked(changed)

    if (abortRef.current) {
      abortRef.current.abort()
    }

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch(
        `${BACKEND_URL}${path}`,
        toggleOptions(changed, controller.signal)
      )
      if (!response.ok) {
        throw new Error('Failed to like comment.')
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      setLiked(!changed)
      console.log('Failed to like comment.')
    }
  }

  return (
    <button onClick={changeLiked} type='button'>
      {icon}
    </button>
  )
}

export default Like
