import type { Identity } from './identity'

interface UserData {
	id: string
	name: string
	display: string
	avatar: string
}

interface SelfData extends UserData {
	identities: Identity[]
}

interface CommentData {
	id: string
	content: string
	createdAt: string
	author: UserData
	likes: number
	liked: boolean
}

interface PostData {
	id: string
	title: string
	content: string | null
	createdAt: string
	images: ImageData[]
	author: UserData
	comments: number
	likes: number
	liked: boolean
}

interface ImageData {
	id: string
	postId: string
	publicId: string
	width: number
	height: number
}

export type { CommentData, ImageData, PostData, SelfData, UserData }
