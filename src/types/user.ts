import type { CloudinaryImage } from '@cloudinary/url-gen/index'

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

export type { RawUser, UserData }
