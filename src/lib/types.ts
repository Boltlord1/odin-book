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
}

interface PostData {
	id: string
	title: string
	content: string
	createdAt: Date
	author: UserData
	comments: CommentData[]
}

interface RawComment {
	id: string
	content: string
	createdAt: string
	author: RawUser
}

interface CommentData {
	id: string
	content: string
	createdAt: Date
	author: UserData
}

type UpdatePost = (id: string) => Promise<void>

export type {
	CommentData,
	PostData,
	RawComment,
	RawPost,
	RawUser,
	ReqError,
	UpdatePost,
	UserData
}
