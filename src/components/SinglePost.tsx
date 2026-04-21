import { type FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { refinePost } from '../lib/refine'
import type { PostData, RawPost, UpdatePost } from '../lib/types'
import Post from './Post'

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

	const updatePost: UpdatePost = async (id) => {
		const url = `http://localhost:3000/post/${id}`
		const response = await fetch(url, { credentials: 'include' })
		const json: RawPost = await response.json()
		const data = refinePost(json)
		setPost(data)
	}

	if (post === null) return
	return <Post data={post} feed={false} update={updatePost} />
}

export default SinglePost
