import type { RouteObject } from 'react-router'
import Post from './components/Post'

const routes: RouteObject[] = [
	{
		path: 'post/:id',
		element: <Post />
	}
]

export default routes
