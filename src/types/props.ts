import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import type { UserData } from './user'

interface DisplayProps extends PropsWithChildren {
	setEdit: Dispatch<SetStateAction<boolean>>
}

interface EditProps extends DisplayProps {
	setUser: Dispatch<SetStateAction<UserData>>
}

export type { DisplayProps, EditProps }
