import { AdvancedImage } from '@cloudinary/react'
import Send from '@material-design-icons/svg/filled/send.svg?react'
import Message from '@material-design-icons/svg/outlined/chat_bubble.svg?react'
import Like from '@material-design-icons/svg/outlined/favorite.svg?react'
import Share from '@material-design-icons/svg/outlined/share.svg?react'
import type {
	ChangeEventHandler,
	FunctionComponent,
	MouseEventHandler,
	SubmitEventHandler
} from 'react'
import { Link } from 'react-router'
import { jsonPost } from '../lib/options'
import type { LikePost, PostData, UpdatePost } from '../lib/types'
import Comment from './Comment'
import LabelledIcon from './LabelledIcon'
import { ChatCircleIcon, PaperPlaneRightIcon, HeartStraightIcon, ShareFatIcon } from '@phosphor-icons/react'

interface Props {
	data: PostData
	feed: boolean
	like: LikePost
	update: UpdatePost
}

const Post: FunctionComponent<Props> = ({ data, feed, like, update }) => {
	const adjustHeight: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
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
			const textarea = event.target.querySelector('textarea')
			if (textarea) {
				textarea.value = ''
			}
			return
		}

		console.log(json)
	}

	const handleLike: MouseEventHandler = data.liked
		? async () => {
				const response = await fetch(
					`http://localhost:3000/like/post/${data.id}`,
					{ method: 'delete', credentials: 'include' }
				)
				console.log('asd')
				const json: boolean = await response.json()

				if (json === true) {
					like(data.id, true)
					return
				}

				console.log(json)
			}
		: async () => {
				const response = await fetch(
					`http://localhost:3000/like/post/${data.id}`,
					{ method: 'post', credentials: 'include' }
				)
				const json: boolean = await response.json()

				if (json === true) {
					like(data.id, false)
					return
				}

				console.log(json)
			}

	const title = <h3 className='font-semibold text-lg'>{data.title}</h3>
	const comments = (
		<LabelledIcon
			Icon={ChatCircleIcon}
			text={data.comments.length}
		/>
	)

	if (data === null) return
	return (
		<>
			<div className='p-4 flex flex-col gap-4'>
				<div className='flex flex-col gap-1'>
					<div className='flex gap-2'>
						<AdvancedImage
							cldImg={data.author.avatar}
							className='w-8 h-8 rounded-full'
						/>
						<p className='text-lg'>{data.author.display}</p>
					</div>
					{feed ? <Link to={`/app/post/${data.id}`}>{title}</Link> : title}
					<p>{data.content}</p>
				</div>
				<div className={`flex gap-4 ${feed ? '' : 'ml-4'}`}>
					<LabelledIcon
						Icon={HeartStraightIcon}
						text={data.likes}
						divProps={{ onClick: handleLike }}
						iconProps={{ className: `${data.liked ? 'liked' : 'like'}`, weight: data.liked ? 'fill' : 'bold' }}
					/>
					{feed ? (
						<Link to={`/app/post/${data.id}`}>{comments}</Link>
					) : (
						comments
					)}
					<LabelledIcon Icon={ShareFatIcon} text='Share' />
				</div>
				{!feed && (
					<>
						<form onSubmit={submitComment} className='flex flex-col ml-4 mr-4'>
							<textarea
								name='content'
								placeholder='add a comment...'
								rows={2}
								onChange={adjustHeight}
								className='bg-gray-200 p-2 text-sm rounded-lg outline-0 resize-none'
							></textarea>
							<button type='submit' className='self-end mr-4 mt-2'>
								<PaperPlaneRightIcon weight='bold' className='w-6 h-6' />
							</button>
						</form>
						<div className='flex flex-col ml-2 mr-2 gap-2'>
							{data.comments.map((c) => (
								<Comment key={c.id} data={c} />
							))}
						</div>
					</>
				)}
			</div>
			<hr />
		</>
	)
}

export default Post
