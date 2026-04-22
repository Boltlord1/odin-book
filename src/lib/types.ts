import type { CloudinaryImage } from '@cloudinary/url-gen/index'

interface ReqError {
	type: 'client' | 'server'
	name: string
	msg: string
}

interface RawUser {
	name: string
	display: string
	avatar: string
}

interface UserData {
	name: string
	display: string
	avatar: CloudinaryImage
}

interface RawPost {
	id: string
	title: string
	content: string
	createdAt: string
	author: RawUser
	comments: RawComment[]
	likedBy: RawUser[]
	_count: {
		likedBy: number
	}
}

interface PostData {
	id: string
	title: string
	content: string
	createdAt: Date
	author: UserData
	comments: CommentData[]
	liked: boolean
	likes: number
}

interface RawComment {
	id: string
	content: string
	createdAt: string
	author: RawUser
	_count: {
		likedBy: number
	}
}

interface CommentData {
	id: string
	content: string
	createdAt: Date
	author: UserData
	_count: {
		likedBy: number
	}
}

type UpdatePost = (id: string) => Promise<void>
type LikePost = (id: string, dislike: boolean) => void

export type {
	CommentData,
	LikePost,
	PostData,
	RawComment,
	RawPost,
	RawUser,
	ReqError,
	UpdatePost,
	UserData
}
