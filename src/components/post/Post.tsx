import { ChatCircleIcon, ShareFatIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import shorten from '../../lib/shorten'
import type { PostData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Icon from '../general/Icon'
import Like from '../general/Like'
import Slideshow from './Slideshow'

interface Props {
  feed?: boolean
  post: PostData
  user?: boolean
}

const Post: FunctionComponent<Props> = ({ post, feed, user }) => {
  const author = (
    <div className='flex gap-2'>
      <Avatar publicId={post.author.avatar} />
      <p className='text-lg'>{post.author.display}</p>
    </div>
  )
  const title = (
    <h3 className='wrap-break-word font-semibold text-lg'>{post.title}</h3>
  )
  const comments = <Icon Icon={ChatCircleIcon} text={post.comments} />

  const content = feed ? shorten(post.content, 300) : post.content

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
        {content && <p className='wrap-break-word'>{content}</p>}
      </div>
      <div className='flex gap-4'>
        <Like
          initial={post.liked}
          likes={post.likes}
          path={`/like/post/${post.id}`}
        />
        {feed ? <Link to={`/app/post/${post.id}`}>{comments}</Link> : comments}
        <Icon Icon={ShareFatIcon} text='Share' />
      </div>
    </div>
  )
}

export default Post
