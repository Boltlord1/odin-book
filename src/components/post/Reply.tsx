import type { FunctionComponent } from 'react'
import type { ReplyData } from '../../types/data'
import { Avatar } from '../general/Avatar'
import Delete from '../general/Delete'
import Like from '../general/Like'

interface Props {
  reply: ReplyData
}

const Reply: FunctionComponent<Props> = ({ reply }) => (
  <div className='flex gap-2'>
    <Avatar publicId={reply.author.avatar} />
    <div className='mb-1 flex-1'>
      <p className='mb-1 font-semibold leading-none'>{reply.author.display}</p>
      <p className='wrap-anywhere'>{reply.content}</p>
    </div>
    <div className='flex gap-2'>
      <Delete id={reply.id} type='reply' userId={reply.author.id} />
      <Like
        initial={reply.liked}
        likes={reply.likeCount}
        path={`/like/reply/${reply.id}`}
      />
    </div>
  </div>
)

export default Reply
