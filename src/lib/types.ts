import type { CloudinaryImage } from '@cloudinary/url-gen/index'

interface RawUser {
	name: string
	display: string
	avatar: string
}

interface RawPost {
	id: string
	title: string
	content: string
	createdAt: string
	author: RawUser
}

interface UserData {
	name: string
	display: string
	avatar: CloudinaryImage
}

interface PostData {
	id: string
	title: string
	content: string
	createdAt: Date
	author: UserData
}

export type { PostData, RawPost, RawUser, UserData }
