import { type FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import cloudinary from '../lib/cloudinary'
import type { PostData, RawPost } from '../lib/types'
import Post from './Post'

const SinglePost: FunctionComponent = () => {
	const { id } = useParams()
	const [post, setPost] = useState<PostData | null>(null)

	useEffect(() => {
		async function getPost() {
			const url = `http://localhost:3000/post/${id}`
			const response = await fetch(url, { credentials: 'include' })
			const json: RawPost = await response.json()

			const data: PostData = {
				...json,
				createdAt: new Date(json.createdAt),
				author: {
					...json.author,
					avatar: cloudinary.image(json.author.avatar)
				},
				comments: json.comments.map((c) => ({
					...c,
					author: { ...c.author, avatar: cloudinary.image(c.author.avatar) }
				}))
			}
			setPost(data)
		}
		getPost()
	}, [id])

	return <Post data={post} />
}

export default SinglePost
