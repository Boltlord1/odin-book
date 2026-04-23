import type { RawUser, UserData } from './user'

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

export type { CommentData, RawComment }
