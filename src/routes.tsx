import type { RouteObject } from 'react-router'
import App from './components/App'
import Feed from './components/Feed'
import LogIn from './components/LogIn'
import SinglePost from './components/SinglePost'
import verify from './lib/verify'

const routes: RouteObject[] = [
	{
		path: '/app',
		element: <App />,
		children: [
			{ path: '/app/post', element: <Feed /> },
			{ path: '/app/post/:id', element: <SinglePost /> }
		]
	},
	{
		path: '/auth/login',
		element: <LogIn />
	},
	{
		path: '/',
		loader: verify
	}
]

export default routes
