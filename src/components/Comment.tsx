import { AdvancedImage } from '@cloudinary/react'
import type { FunctionComponent } from 'react'
import type { CommentData } from '../lib/types'

interface Props {
	data: CommentData
}

const Comment: FunctionComponent<Props> = ({ data }) => {
	return (
		<div className='flex gap-2'>
			<AdvancedImage
				cldImg={data.author.avatar}
				className='w-6 h-6 rounded-full'
			/>
			<div className='mb-1'>
				<p className='font-semibold leading-none mb-1'>{data.author.display}</p>
				<p className=''>{data.content}</p>
			</div>
		</div>
	)
}

export default Comment
