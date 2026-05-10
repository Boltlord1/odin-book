import { AdvancedImage } from '@cloudinary/react'
import { ChatCircleIcon, HeartIcon } from '@phosphor-icons/react'
import {
  type FunctionComponent,
  type MouseEventHandler,
  useRef,
  useState
} from 'react'
import { Link } from 'react-router'
import getImg from '../../lib/cloudinary'
import { toggleOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import type { CommentData, ReplyData } from '../../types/data'
import Content from '../general/Content'
import Icon from '../general/Icon'
import Reply from './Reply'

interface Props {
  comment: CommentData
}

const Comment: FunctionComponent<Props> = ({ comment }) => {
  const abortRef = useRef<AbortController | null>(null)
  const [liked, setLiked] = useState(comment.liked)
  const [replies, setReplies] = useState(comment.replies)
  const [replyOpen, setReply] = useState(false)

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
        `${backendUrl}/like/comment/${comment.id}`,
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

  const updateReply = (reply: ReplyData) => setReplies([...replies, reply])
  const openReply: MouseEventHandler = () => setReply(!replyOpen)

  const like = (
    <Icon
      divProps={{ onClick: changeLiked }}
      Icon={HeartIcon}
      iconProps={{
        className: `${liked ? 'liked' : 'like'}`,
        weight: liked ? 'fill' : 'bold'
      }}
      text={liked ? comment.likes + 1 : comment.likes}
    />
  )

  const reply = (
    <Icon
      divProps={{ onClick: openReply }}
      Icon={ChatCircleIcon}
      iconProps={{ weight: 'bold' }}
      text={comment.replies.length}
    />
  )

  const author = (
    <Link to={`/app/profile/${comment.author.id}`}>
      <h3 className='mb-1 font-semibold leading-none'>
        {comment.author.display}
      </h3>
    </Link>
  )

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <AdvancedImage
          className='h-6 w-6 rounded-full'
          cldImg={getImg(comment.author.avatar)}
        />
        <div className='mb-1 flex-1'>
          {author}
          <p className='wrap-anywhere'>{comment.content}</p>
        </div>
        <div className='flex gap-2'>
          {reply}
          {like}
        </div>
      </div>
      {replyOpen && (
        <Content
          path={`http://localhost:3000/reply/${comment.id}`}
          placeholder='reply'
          update={updateReply}
        />
      )}
      {replies.length > 0 && (
        <div className='ml-8 flex flex-col gap-2'>
          {replies.map((r) => (
            <Reply key={r.id} reply={r} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
