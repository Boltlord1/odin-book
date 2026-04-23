import type { CommentData, RawComment } from './comment'
import type { RawUser, UserData } from './user'

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

type UpdatePost = (id: string) => Promise<void>
type LikePost = (id: string, dislike: boolean) => void

export type { LikePost, PostData, RawPost, UpdatePost }
