import { AdvancedImage } from '@cloudinary/react'
import { HeartIcon } from '@phosphor-icons/react'
import {
  type FunctionComponent,
  type MouseEventHandler,
  useRef,
  useState
} from 'react'
import getImg from '../../lib/cloudinary'
import { toggleOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import type { ReplyData } from '../../types/data'
import Icon from '../general/Icon'

interface Props {
  reply: ReplyData
}

const Reply: FunctionComponent<Props> = ({ reply }) => {
  const abortRef = useRef<AbortController | null>(null)
  const [liked, setLiked] = useState(reply.liked)

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
        `${backendUrl}/like/reply/${reply.id}`,
        toggleOptions(changed, controller.signal)
      )
      if (!response.ok) {
        throw new Error('Failed to like reply.')
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      setLiked(!changed)
      console.log('Failed to like reply.')
    }
  }

  const like = (
    <Icon
      divProps={{ onClick: changeLiked }}
      Icon={HeartIcon}
      iconProps={{
        className: `${liked ? 'liked' : 'like'}`,
        weight: liked ? 'fill' : 'bold'
      }}
      text={liked ? reply.likes + 1 : reply.likes}
    />
  )

  return (
    <div className='flex gap-2'>
      <AdvancedImage
        className='h-6 w-6 rounded-full'
        cldImg={getImg(reply.author.avatar)}
      />
      <div className='mb-1 flex-1'>
        <p className='mb-1 font-semibold leading-none'>
          {reply.author.display}
        </p>
        <p className='wrap-anywhere'>{reply.content}</p>
      </div>
      <div className='flex gap-2'>{like}</div>
    </div>
  )
}

export default Reply
