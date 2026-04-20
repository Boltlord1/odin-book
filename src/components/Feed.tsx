import { type FunctionComponent, useEffect, useState } from 'react'
import type { PostData, RawPost } from '../lib/types'
import Post from './Post'
import { refinePost } from '../lib/refine'

const Feed: FunctionComponent = () => {
	const [posts, setPosts] = useState<PostData[] | null>(null)

	useEffect(() => {
		async function getPosts() {
			const url = `http://localhost:3000/post`
			const response = await fetch(url, { credentials: 'include' })
			const json: RawPost[] = await response.json()
			const data = json.map(refinePost)
			setPosts(data)
		}
		getPosts()
	}, [])

	if (posts === null) return
	return (
		<div>
			{posts.map((p) => (
				<Post key={p.id} data={p} />
			))}
		</div>
	)
}

export default Feed
