import type { Icon } from '@phosphor-icons/react'
import type { Dispatch, JSX, SetStateAction } from 'react'
import type { ThemeNoAuto } from '../lib/preference'
import type { SelfData } from './data'
import type { ClientError } from './response'

interface ConfirmOptions {
  confirm: () => void
  message: string
}

interface AppContext {
  self: SelfData | null
  setOptions: Dispatch<SetStateAction<ConfirmOptions | null>>
  setSelf: Dispatch<SetStateAction<SelfData>>
  setTheme: Dispatch<SetStateAction<ThemeNoAuto>>
  theme: ThemeNoAuto
}

interface DashboardLink {
  Icon: Icon
  id: string
  text: string
}

type AlertType = string | string[] | undefined | null | false
type SortType = 'recent' | 'top'

interface SortObject {
  element: JSX.Element
  value: SortType
}

interface ValidateProps {
  setValidate: Dispatch<SetStateAction<SelfData>>
}

type ValidatorFunction = (errors?: ClientError[]) => void

type Register = (name: string, validate: () => boolean) => void
type Unregister = (name: string) => void

interface FormContextType {
  errors: ClientError[]
  register: Register
  unregister: Unregister
}

export type {
  AlertType,
  AppContext,
  ConfirmOptions,
  DashboardLink,
  FormContextType,
  Register,
  SortObject,
  SortType,
  Unregister,
  ValidateProps,
  ValidatorFunction
}
