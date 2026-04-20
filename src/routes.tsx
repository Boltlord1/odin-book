import type { RouteObject } from 'react-router'
import App from './components/App'
import Feed from './components/Feed'
import SinglePost from './components/SinglePost'

const routes: RouteObject[] = [
	{
		path: '/app',
		element: <App />,
		children: [
			{ path: '/app/post', element: <Feed /> },
			{ path: '/app/post/:id', element: <SinglePost /> }
		]
	}
]

export default routes
