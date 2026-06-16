import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react'
import type { Icon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { capitalize } from '../../lib/capitalize'

export type OptionTuple<T> = [
  OptionProps<T>,
  OptionProps<T>,
  ...OptionProps<T>[]
]
interface OptionProps<T> {
  icon: Icon
  name: T
}

interface Props<T> {
  onChange: (str: T) => void
  options: OptionTuple<T>
  selected: T
  title: string
}

const Select = <T extends string>({
  title,
  options,
  selected,
  onChange
}: Props<T>) => {
  const [name, setName] = useState(
    options.find((o) => o.name === selected)?.name as T
  )
  const Icon = options.find((opt) => opt.name === name)?.icon as Icon

  useEffect(() => {
    onChange(name)
  }, [onChange, name])

  return (
    <div className='flex'>
      <h3 className='flex-1 font-semibold text-lg'>{title}</h3>
      <Listbox onChange={setName} value={selected}>
        <ListboxButton className='flex min-w-30 items-center gap-2 rounded-lg bg-gray-100 px-4 py-1 font-semibold dark:bg-zinc-700'>
          <Icon size={24} weight='bold' />
          <span>{capitalize(name)}</span>
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: 'bottom end', gap: 8 }}
          className='flex min-w-30 flex-col rounded-xl bg-gray-100 px-4 py-2 dark:bg-zinc-700'
          modal={false}
        >
          {options.map((opt) => (
            <ListboxOption
              className='flex items-center gap-2 py-1 font-semibold'
              key={opt.name}
              value={opt.name}
            >
              <opt.icon size={24} weight='bold' />
              <span>{capitalize(opt.name)}</span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}

export default Select
