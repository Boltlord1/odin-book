import { AdvancedImage } from '@cloudinary/react'
import type { FunctionComponent } from 'react'
import getImg from '../../lib/cloudinary'
import type { CommentData } from '../../types/data'

interface Props {
	data: CommentData
}

const Comment: FunctionComponent<Props> = ({ data }) => {
	return (
		<div className='pl-4 pr-4 flex gap-2'>
			<AdvancedImage
				cldImg={getImg(data.author.avatar)}
				className='w-6 h-6 rounded-full'
			/>
			<div className='mb-1'>
				<p className='font-semibold leading-none mb-1'>{data.author.display}</p>
				<p className='wrap-anywhere'>{data.content}</p>
			</div>
		</div>
	)
}

export default Comment
