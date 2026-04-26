import type { CloudinaryImage } from '@cloudinary/url-gen/index'

interface RawUser {
	id: string
	name: string
	display: string
	avatar: string
}

interface UserData {
	id: string
	name: string
	display: string
	avatar: CloudinaryImage
}

export type { RawUser, UserData }
