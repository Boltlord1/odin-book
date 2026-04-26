import type { RouteObject } from 'react-router'
import App from './components/App'
import Account from './components/account/Account'
import LogIn from './components/auth/LogIn'
import SignUp from './components/auth/SignUp'
import SignUpOAuth from './components/auth/SignUpOAuth'
import Feed from './components/post/Feed'
import SinglePost from './components/post/SinglePost'
import Upload from './components/post/Upload'
import { indexLoader, userLoader } from './lib/loaders'

const routes: RouteObject[] = [
	{
		path: '/app',
		element: <App />,
		loader: userLoader,
		children: [
			{ path: '/app/account', element: <Account /> },
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
		loader: indexLoader
	}
]

export default routes
