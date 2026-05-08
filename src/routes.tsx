import type { RouteObject } from 'react-router'
import App from './components/App'
import Account from './components/account/Account'
import LogIn from './components/auth/LogIn'
import SignUp from './components/auth/SignUp'
import SignUpEmail from './components/auth/SignUpEmail'
import SignUpOAuth from './components/auth/SignUpoAuth'
import Chat from './components/chat/Chat'
import Chats from './components/chat/Chats'
import FeedMain from './components/post/FeedMain'
import SinglePost from './components/post/SinglePost'
import Upload from './components/post/Upload'
import Other from './components/profile/Other'
import Self from './components/profile/Self'
import authLoader from './loaders/auth'
import chatLoader from './loaders/chat'
import chatsLoader from './loaders/chats'
import feedLoader from './loaders/feed'
import postLoader from './loaders/post'
import profileLoader from './loaders/profile'
import selfLoader from './loaders/self'

const routes: RouteObject[] = [
  {
    path: '/app',
    element: <App />,
    loader: selfLoader,
    children: [
      {
        path: '/app/account',
        element: <Account />
      },
      {
        path: '/app/post',
        element: <FeedMain />,
        loader: feedLoader
      },
      {
        path: '/app/post/:id',
        element: <SinglePost />,
        loader: postLoader
      },
      {
        path: '/app/upload',
        element: <Upload />
      },
      {
        path: '/app/profile',
        element: <Self />
      },
      {
        path: '/app/profile/:id',
        element: <Other />,
        loader: profileLoader
      },
      {
        path: '/app/chat',
        element: <Chats />,
        loader: chatsLoader
      },
      {
        path: '/app/chat/:id',
        element: <Chat />,
        loader: chatLoader
      }
    ]
  },
  {
    path: '/auth/login',
    element: <LogIn />
  },
  {
    path: '/auth/signup',
    element: <SignUp />
  },
  {
    path: '/auth/signup/google',
    element: <SignUpOAuth provider='google' />
  },
  {
    path: '/auth/signup/github',
    element: <SignUpOAuth provider='github' />
  },
  {
    path: '/auth/signup/email',
    element: <SignUpEmail />
  },
  {
    path: '/',
    loader: authLoader
  }
]

export default routes
