import type { Identity } from './identity'

export interface UserData {
  avatar: string | null
  commentCount: number
  deleted: boolean
  display: string
  followerCount: number
  followingCount: number
  id: string
  name: string
  postCount: number
}

export interface ProfileData extends UserData {
  followed: boolean
}

export interface SelfData extends UserData {
  identities: Identity[]
}

interface ContentBase {
  author: UserData | null
  authorId: string
  content: string | null
  createdAt: string
  deletedAt: string
  id: string
  likeCount: number
  liked: boolean
}

export interface CommentData extends ContentBase {
  childCount: number
  children: CommentData[]
  parentId: string | null
  postId: string
}

export interface PostData extends ContentBase {
  commentCount: number
  images: ImageData[]
  title: string
}

export interface ImageData {
  height: number
  id: string
  postId: string
  publicId: string
  width: number
}

export interface MessageData extends ContentBase {
  authorId: string
  chatId: string
  content: string
  createdAt: string
  deleted: boolean
  id: string
}

interface ChatBase {
  id: string
  messageCount: number
  user: UserData
}

export interface PrivateChatData extends ChatBase {
  type: 'Private'
}

export interface GroupChatData extends ChatBase {
  name: string
  type: 'Group'
}

export type ChatData = PrivateChatData | GroupChatData

export type ChatDataMinimal =
  | (PrivateChatData & { message: MessageData })
  | (GroupChatData & { message: MessageData })
