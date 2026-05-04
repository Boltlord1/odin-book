import type { Identity } from './identity'

interface UserData {
  avatar: string
  display: string
  followers: number
  follows: number
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

interface CommentData {
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

export type {
  CommentData,
  ImageData,
  PostData,
  ProfileData,
  SelfData,
  UserData
}
