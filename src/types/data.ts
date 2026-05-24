import type { Identity } from './identity'

interface UserData {
  avatar: string | null
  display: string
  id: string
  name: string
}

interface UserExtraData extends UserData {
  followers: number
  following: number
  posts: number
}

interface ProfileData extends UserExtraData {
  followed: boolean
}

interface SelfData extends UserExtraData {
  identities: Identity[]
}

interface ContentData {
  author: UserData | null
  content: string
  createdAt: string
  id: string
  liked: boolean
  likes: number
}

interface ReplyData extends ContentData {
  author: UserData
}

interface CommentData extends ContentData {
  replies: ReplyData[]
  reply: number
}

interface PostData {
  author: UserData | null
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
  UserData,
  UserExtraData
}
