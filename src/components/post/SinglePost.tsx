import { useEffect, useState, type FunctionComponent } from 'react'
import { useLoaderData } from 'react-router'
import type { CommentData, PostData } from '../../types/data'
import Post from './Post'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { backendUrl } from '../../lib/variables'

const SinglePost: FunctionComponent = () => {
	const post = useLoaderData<PostData>()
	const [comments, setComments] = useState<CommentData[]>([])

	useEffect(() => {
		async function getComments() {
			const response = await fetch(`${backendUrl}/post/${post.id}/comment`, { credentials: 'include' })
			if (response.ok) {
				const json = await response.json()
				setComments(json)
			}
		}
		getComments()
	}, [post.id])

	return (
		<div className='flex flex-col gap-4'>
			<Post post={post} feed={false} />
			<CommentForm id={post.id} />
			{comments.map(c => <Comment key={c.id} data={c} />)}
		</div>
	)
}

export default SinglePost
