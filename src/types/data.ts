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
  replyCount: number
}

export interface ProfileData extends UserData {
  followed: boolean
}

export interface SelfData extends UserData {
  identities: Identity[]
}

interface ContentBase {
  authorId: string
  createdAt: string
  deleted: boolean
  id: string
}

interface ContentData extends ContentBase {
  author: UserData | null
  content: string
  likeCount: number
  liked: boolean
}

export interface ReplyData extends ContentData {
  author: UserData
  commentId: string
}

export interface CommentData extends ContentData {
  postId: string
  replyCount: number
}

export interface PostData extends ContentBase {
  author: UserData | null
  commentCount: number
  content: string | null
  images: ImageData[]
  likeCount: number
  liked: boolean
  replyCount: number
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
