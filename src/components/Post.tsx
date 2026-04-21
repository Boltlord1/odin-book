import { AdvancedImage } from '@cloudinary/react'
import { mdiSend } from '@mdi/js'
import { Icon } from '@mdi/react'
import type {
	ChangeEventHandler,
	FunctionComponent,
	SubmitEventHandler
} from 'react'
import { Link } from 'react-router'
import { jsonPost } from '../lib/options'
import type { PostData, UpdatePost } from '../lib/types'
import Comment from './Comment'

interface Props {
	data: PostData
	feed: boolean
	update: UpdatePost
}

const Post: FunctionComponent<Props> = ({ data, feed, update }) => {
	const changeText: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		const textarea = event.target
		textarea.style.height = 'auto'
		textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
	}

	const submitComment: SubmitEventHandler = async (event) => {
		event.preventDefault()
		const response = await fetch(
			`http://localhost:3000/post/${data.id}`,
			jsonPost(event.target)
		)
		const json = await response.json()

		if (json === true) {
			update(data.id)
			return
		}

		console.log(json)
	}

	if (data === null) return
	return (
		<div className='p-4 flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<div className='flex gap-2'>
					<AdvancedImage
						cldImg={data.author.avatar}
						className='w-8 h-8 rounded-full'
					/>
					<p className='text-lg'>{data.author.display}</p>
				</div>
				{feed ? (
					<Link to={`/app/post/${data.id}`}>
						<h3 className='font-semibold text-lg'>{data.title}</h3>
					</Link>
				) : (
					<h3 className='font-semibold text-lg'>{data.title}</h3>
				)}
				<p className='ml-1'>{data.content}</p>
			</div>
			<form onSubmit={submitComment} className='flex flex-col ml-4 mr-4'>
				<textarea
					name='content'
					placeholder='add a comment...'
					rows={2}
					onChange={changeText}
					className='bg-gray-200 p-2 text-sm rounded-lg outline-0'
				></textarea>
				<button type='submit' className='self-end mr-4 mt-2'>
					<Icon path={mdiSend} size={1} />
				</button>
			</form>
			<div className='flex flex-col ml-2 mr-2'>
				{data.comments.map((c) => (
					<Comment key={c.id} data={c} />
				))}
			</div>
		</div>
	)
}

export default Post
