interface ResError {
	type: 'client' | 'server'
	name: string
	msg: string
}

export type { ResError }
