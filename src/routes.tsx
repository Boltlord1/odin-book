import type { RouteObject } from 'react-router'
import App from './components/App'
import Feed from './components/Feed'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import SignUpOAuth from './components/SignUpOAuth'
import SinglePost from './components/SinglePost'
import Upload from './components/Upload'
import verify from './lib/verify'

const routes: RouteObject[] = [
	{
		path: '/app',
		element: <App />,
		children: [
			{ path: '/app/post', element: <Feed /> },
			{ path: '/app/post/:id', element: <SinglePost /> },
			{ path: '/app/upload', element: <Upload /> }
		]
	},
	{
		path: '/auth/login',
		element: <LogIn />
	},
	{
		path: 'auth/signup',
		element: <SignUp />
	},
	{
		path: 'auth/signup/google',
		element: <SignUpOAuth provider='google' />
	},
	{
		path: 'auth/signup/github',
		element: <SignUpOAuth provider='github' />
	},
	{
		path: '/',
		loader: verify
	}
]

export default routes
