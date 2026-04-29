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

interface EmailIdentity {
	provider: 'Email'
	id: string
	data: {
		hash: string
		verified: boolean
	}
}

interface GoogleIdentity {
	provider: 'Google'
	id: string
	data: {
		email: string
	}
}

interface GithubIdentity {
	provider: 'Github'
	id: string
	data: {
		username: string
		url: string
	}
}

type Identity = EmailIdentity | GoogleIdentity | GithubIdentity

interface RawSelf extends RawUser {
	identities: Identity[]
}

interface SelfData extends UserData {
	identities: Identity[]
}

export type { RawSelf, RawUser, SelfData, UserData }
