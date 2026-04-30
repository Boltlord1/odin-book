import { PaperPlaneRightIcon } from '@phosphor-icons/react'
import type { FunctionComponent, SubmitEventHandler } from 'react'
import adjustHeight from '../../lib/adjustHeight'
import { jsonOptions } from '../../lib/options'

interface Props {
	id: string
}

const CommentForm: FunctionComponent<Props> = ({ id }) => {
	const submitComment: SubmitEventHandler = async (event) => {
		event.preventDefault()

		const response = await fetch(
			`http://localhost:3000/post/${id}`,
			jsonOptions(event.target)
		)

		console.log(response.ok)
	}

	return (
		<form onSubmit={submitComment} className='pl-4 pr-4 flex flex-col'>
			<textarea
				name='comment'
				placeholder='add a comment...'
				rows={2}
				onChange={adjustHeight}
				className='bg-gray-200 p-2 text-sm rounded-lg outline-0 resize-none'
			></textarea>
			<button type='submit' className='self-end mr-4 mt-2'>
				<PaperPlaneRightIcon weight='bold' className='w-6 h-6' />
			</button>
		</form>
	)
}

export default CommentForm
