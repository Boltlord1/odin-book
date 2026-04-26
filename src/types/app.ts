import type { Dispatch, SetStateAction } from 'react'
import type { UserData } from './user'

interface AppContext {
	user: UserData
	setUser: Dispatch<SetStateAction<UserData>>
}

export type { AppContext }
