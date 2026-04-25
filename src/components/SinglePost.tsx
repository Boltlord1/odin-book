import { type FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { refinePost } from '../lib/refine'
import { backendUrl } from '../lib/variables'
import type { LikePost, PostData, RawPost, UpdatePost } from '../types/post'
import Post from './Post'

const SinglePost: FunctionComponent = () => {
	const { id } = useParams()
	const [post, setPost] = useState<PostData | null>(null)

	useEffect(() => {
		async function getPost() {
			const url = `${backendUrl}/post/${id}`
			const response = await fetch(url, { credentials: 'include' })
			const json: RawPost = await response.json()
			const data = refinePost(json)
			setPost(data)
		}
		getPost()
	}, [id])

	if (post === null) return null

	const updatePost: UpdatePost = async (id) => {
		const url = `${backendUrl}/post/${id}`
		const response = await fetch(url, { credentials: 'include' })
		const json: RawPost = await response.json()
		const data = refinePost(json)

		setPost(data)
	}

	const likePost: LikePost = (id, dislike) => {
		const data: PostData = {
			...post,
			liked: !dislike,
			likes: dislike ? post.likes - 1 : post.likes + 1
		}

		setPost(data)
	}

	return <Post data={post} feed={false} like={likePost} update={updatePost} />
}

export default SinglePost
