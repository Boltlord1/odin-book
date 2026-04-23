interface ReqError {
	type: 'client' | 'server'
	name: string
	msg: string
}

export type { ReqError }
