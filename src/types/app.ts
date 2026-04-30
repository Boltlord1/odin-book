import type { Dispatch, SetStateAction } from 'react'
import type { SelfData } from './data'

interface AppContext {
	user: SelfData
	setUser: Dispatch<SetStateAction<SelfData>>
}

export type { AppContext }
