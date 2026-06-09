import { ChatCircleIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import shorten from '../../lib/shorten'
import type { PostData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Delete from '../general/Delete'
import Icon from '../general/Icon'
import Like from '../general/Like'
import Share from '../general/Share'
import Slideshow from './Slideshow'

interface Props {
  commentCount: number
  deleter?: ((id: string) => void) | false
  feed?: boolean
  post: PostData
  user?: boolean
}

const Post: FunctionComponent<Props> = ({
  commentCount,
  deleter,
  post,
  feed,
  user
}) => {
  const author = post.author ? (
    <div className='flex gap-2'>
      <Avatar publicId={post.author.avatar} />
      <h3 className='text-lg'>{post.author.display}</h3>
    </div>
  ) : (
    <div className='flex gap-2'>
      <Avatar publicId={null} />
      <h3 className='text-lg'>Deleted</h3>
    </div>
  )
  const title = (
    <h3 className='wrap-break-word font-semibold text-lg'>{post.title}</h3>
  )
  const comments = <Icon Icon={ChatCircleIcon} text={commentCount} />
  const content = feed ? shorten(post.content, 300) : post.content

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        {!user && post.author ? (
          <Link to={`/app/profile/${post.author.id}`}>{author}</Link>
        ) : (
          author
        )}
        {feed ? <Link to={`/app/post/${post.id}`}>{title}</Link> : title}
        {post.images.length > 0 && <Slideshow data={post.images} />}
        {content && <p className='wrap-break-word'>{content}</p>}
      </div>
      <div className='flex gap-4'>
        <Like
          initial={post.liked}
          likes={post.likeCount}
          path={`/like/post/${post.id}`}
        />
        {feed ? <Link to={`/app/post/${post.id}`}>{comments}</Link> : comments}
        <Share id={post.id} />
        {deleter && <Delete confirm={() => deleter(post.id)} msg='this post' />}
      </div>
    </div>
  )
}

export default Post
