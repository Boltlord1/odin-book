import { type FunctionComponent, useEffect, useState } from 'react'
import { refinePost } from '../lib/refine'
import type { LikePost, PostData, RawPost, UpdatePost } from '../types/post'
import Post from './Post'

const Feed: FunctionComponent = () => {
	const [posts, setPosts] = useState<PostData[] | null>(null)

	useEffect(() => {
		async function getPosts() {
			const url = 'http://localhost:3000/post'
			const response = await fetch(url, { credentials: 'include' })
			const json: RawPost[] = await response.json()
			const data = json.map(refinePost)
			setPosts(data)
		}
		getPosts()
	}, [])

	if (posts === null) return null

	const updateFeed: UpdatePost = async (id) => {
		const url = `http://localhost:3000/post/${id}`
		const response = await fetch(url, { credentials: 'include' })
		const json: RawPost = await response.json()
		const refined = refinePost(json)

		const index = posts.findIndex((p) => p.id === id)
		const data = posts.slice(0)
		data[index] = refined

		setPosts(data)
	}

	const likePost: LikePost = (id, dislike) => {
		const index = posts.findIndex((p) => p.id === id)
		const data = posts.slice(0)
		data[index] = {
			...data[index],
			liked: !dislike,
			likes: dislike ? data[index].likes-- : data[index].likes++
		}

		setPosts(data)
	}

	return (
		<div>
			<hr />
			{posts.map((p) => (
				<Post
					key={p.id}
					data={p}
					feed={true}
					like={likePost}
					update={updateFeed}
				/>
			))}
		</div>
	)
}

export default Feed
