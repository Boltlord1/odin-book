import { AdvancedImage } from '@cloudinary/react'
import { HeartIcon } from '@phosphor-icons/react'
import {
  type FunctionComponent,
  type MouseEventHandler,
  useRef,
  useState
} from 'react'
import getImg from '../../lib/cloudinary'
import { backendUrl } from '../../lib/variables'
import type { CommentData } from '../../types/data'
import Icon from '../general/Icon'

interface Props {
  comment: CommentData
  postId: string
}

const Comment: FunctionComponent<Props> = ({ comment, postId }) => {
  const [liked, setLiked] = useState(comment.liked)
  const abortRef = useRef<AbortController | null>(null)

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
        `${backendUrl}/post/${postId}/like/${comment.id}`,
        {
          method: changed ? 'post' : 'delete',
          credentials: 'include',
          signal: controller.signal
        }
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

  const like = (
    <Icon
      divProps={{
        onClick: changeLiked,
        className: 'absolute right-4 top-0'
      }}
      Icon={HeartIcon}
      iconProps={{
        className: `${liked ? 'liked' : 'like'}`,
        weight: liked ? 'fill' : 'bold'
      }}
      text={liked ? comment.likes + 1 : comment.likes}
    />
  )

  return (
    <div className='relative flex gap-2 px-4'>
      <AdvancedImage
        className='h-6 w-6 rounded-full'
        cldImg={getImg(comment.author.avatar)}
      />
      <div className='mb-1'>
        <p className='mb-1 font-semibold leading-none'>
          {comment.author.display}
        </p>
        <p className='wrap-anywhere'>{comment.content}</p>
      </div>
      {like}
    </div>
  )
}

export default Comment
