import { AdvancedImage } from '@cloudinary/react'
import type { FunctionComponent } from 'react'
import getImg from '../../lib/cloudinary'
import type { CommentData } from '../../types/data'

interface Props {
  data: CommentData
}

const Comment: FunctionComponent<Props> = ({ data }) => (
  <div className='flex gap-2 pr-4 pl-4'>
    <AdvancedImage
      className='h-6 w-6 rounded-full'
      cldImg={getImg(data.author.avatar)}
    />
    <div className='mb-1'>
      <p className='mb-1 font-semibold leading-none'>{data.author.display}</p>
      <p className='wrap-anywhere'>{data.content}</p>
    </div>
  </div>
)

export default Comment
