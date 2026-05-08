import { AdvancedImage } from '@cloudinary/react'
import { ChatCircleIcon, HeartIcon, ShareFatIcon } from '@phosphor-icons/react'
import {
  type FunctionComponent,
  type MouseEventHandler,
  useRef,
  useState
} from 'react'
import { Link } from 'react-router'
import getImg from '../../lib/cloudinary'
import { toggleOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import type { PostData } from '../../types/data'
import Icon from '../general/Icon'
import Slideshow from './Slideshow'

interface Props {
  feed?: boolean
  post: PostData
  user?: boolean
}

const Post: FunctionComponent<Props> = ({ post, feed, user }) => {
  const abortRef = useRef<AbortController | null>(null)
  const [liked, setLiked] = useState(post.liked)

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
        `${backendUrl}/like/post/${post.id}`,
        toggleOptions(changed, controller.signal)
      )
      if (!response.ok) {
        throw new Error('Failed to like post.')
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      setLiked(!changed)
      console.log('Failed to like post.')
    }
  }

  const author = (
    <div className='flex gap-2 px-4'>
      <AdvancedImage
        className='h-8 w-8 rounded-full'
        cldImg={getImg(post.author.avatar)}
      />
      <p className='text-lg'>{post.author.display}</p>
    </div>
  )
  const title = <h3 className='px-4 font-semibold text-lg'>{post.title}</h3>
  const comments = <Icon Icon={ChatCircleIcon} text={post.comments} />

  const like = (
    <Icon
      divProps={{
        onClick: changeLiked
      }}
      Icon={HeartIcon}
      iconProps={{
        className: `${liked ? 'liked' : 'like'}`,
        weight: liked ? 'fill' : 'bold'
      }}
      text={liked ? post.likes + 1 : post.likes}
    />
  )

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        {user ? (
          author
        ) : (
          <Link to={`/app/profile/${post.author.id}`}>{author}</Link>
        )}
        {feed ? <Link to={`/app/post/${post.id}`}>{title}</Link> : title}
        {post.images.length > 0 && <Slideshow data={post.images} />}
        {post.content && <p className='px-4'>{post.content}</p>}
      </div>
      <div className='flex gap-4 px-4'>
        {like}
        {feed ? <Link to={`/app/post/${post.id}`}>{comments}</Link> : comments}
        <Icon Icon={ShareFatIcon} text='Share' />
      </div>
    </div>
  )
}

export default Post
