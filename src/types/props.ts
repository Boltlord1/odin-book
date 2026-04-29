import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import type { SelfData } from './user'

interface DisplayProps extends PropsWithChildren {
	setEdit: Dispatch<SetStateAction<boolean>>
}

interface EditProps extends DisplayProps {
	setUser: Dispatch<SetStateAction<SelfData>>
}

export type { DisplayProps, EditProps }
