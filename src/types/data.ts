import type { Identity } from './identity'

interface UserData {
  avatar: string
  display: string
  id: string
  name: string
  posts: number
}

interface ProfileData extends UserData {
  followed: boolean
  followers: number
  follows: number
  posts: number
}

interface SelfData extends UserData {
  followers: number
  follows: number
  identities: Identity[]
  posts: number
}

interface CommentData extends ReplyData {
  replies: ReplyData[]
}

interface ReplyData {
  author: UserData
  content: string
  createdAt: string
  id: string
  liked: boolean
  likes: number
}

interface PostData {
  author: UserData
  comments: number
  content: string | null
  createdAt: string
  id: string
  images: ImageData[]
  liked: boolean
  likes: number
  title: string
}

interface ImageData {
  height: number
  id: string
  postId: string
  publicId: string
  width: number
}

interface MessageData {
  content: string
  createdAt: Date
  id: string
  sent: boolean
}

interface ChatData {
  id: string
  messageCount: number
  messages: MessageData[]
  user: UserData
}

interface ChatDataMinimal {
  id: string
  message: MessageData
  messageCount: number
  user: UserData
}

export type {
  ChatData,
  ChatDataMinimal,
  CommentData,
  ImageData,
  MessageData,
  PostData,
  ProfileData,
  ReplyData,
  SelfData,
  UserData
}
