import { type FunctionComponent, useEffect, useState } from 'react'
import { refinePost } from '../lib/refine'
import type { PostData, RawPost, UpdatePost } from '../lib/types'
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

	if (posts === null) return

	const updateFeed: UpdatePost = async (id) => {
		const url = `http://localhost:3000/post/${id}`
		const response = await fetch(url, { credentials: 'include' })
		const json: RawPost = await response.json()
		const data = refinePost(json)

		const index = posts.findIndex((p) => p.id === id)
		const refresh = posts.toSpliced(0)
		refresh[index] = data

		setPosts(refresh)
	}

	return (
		<div>
			{posts.map((p) => (
				<Post key={p.id} data={p} feed={true} update={updateFeed} />
			))}
		</div>
	)
}

export default Feed
