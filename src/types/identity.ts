interface EmailIdentity {
	provider: 'Email'
	id: string
	data: {
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

export type { Identity }
