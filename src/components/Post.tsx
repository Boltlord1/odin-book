import { AdvancedImage } from '@cloudinary/react'
import type { FunctionComponent } from 'react'
import type { PostData } from '../lib/types'
import Comment from './Comment'

interface Props {
	data: PostData | null
}

const Post: FunctionComponent<Props> = ({ data }) => {
	if (data === null) return
	return (
		<div className='p-4'>
			<div className='flex-col mb-3'>
				<div className='flex gap-2 mb-2'>
					<AdvancedImage
						cldImg={data.author.avatar}
						className='w-8 h-8 rounded-full'
					/>
					<p className='text-lg'>{data.author.display}</p>
				</div>
				<h3 className='font-semibold text-lg'>{data.title}</h3>
				<p className='ml-1'>{data.content}</p>
			</div>
			<div className='flex-col ml-2 mr-2'>
				{data.comments.map((c) => (
					<Comment key={c.id} data={c} />
				))}
			</div>
		</div>
	)
}

export default Post
