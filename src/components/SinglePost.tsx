import { type FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { PostData, RawPost } from '../lib/types'
import Post from './Post'
import { refinePost } from '../lib/refine'

const SinglePost: FunctionComponent = () => {
	const { id } = useParams()
	const [post, setPost] = useState<PostData | null>(null)

	useEffect(() => {
		async function getPost() {
			const url = `http://localhost:3000/post/${id}`
			const response = await fetch(url, { credentials: 'include' })
			const json: RawPost = await response.json()
			const data = refinePost(json)
			setPost(data)
		}
		getPost()
	}, [id])

	return <Post data={post} />
}

export default SinglePost
