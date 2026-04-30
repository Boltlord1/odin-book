import type { FunctionComponent } from 'react'
import { useLoaderData } from 'react-router'
import type { PostData } from '../../types/data'
import Post from './Post'

const Feed: FunctionComponent = () => {
	const posts = useLoaderData<PostData[]>()

	return (
		<div className='flex flex-col gap-4'>
			{posts.map((p) => (
				<Post key={p.id} post={p} feed={true} />
			))}
		</div>
	)
}

export default Feed
