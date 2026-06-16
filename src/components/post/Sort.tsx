import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react'
import { ClockCountdownIcon, StarIcon } from '@phosphor-icons/react'
import {
  type Dispatch,
  type FunctionComponent,
  type SetStateAction,
  useState
} from 'react'
import type { SortObject, SortType } from '../../types/app'

const sorts: SortObject[] = [
  {
    value: 'recent',
    element: (
      <>
        <span>Recent</span>
        <ClockCountdownIcon size={24} weight='bold' />
      </>
    )
  },
  {
    value: 'top',
    element: (
      <>
        <span>Top</span>
        <StarIcon size={24} weight='bold' />
      </>
    )
  }
]

interface Props {
  setSort: Dispatch<SetStateAction<SortType>>
  sort: SortType
}

const Sort: FunctionComponent<Props> = ({ sort, setSort }) => {
  const [selected, setSelected] = useState(
    sorts.find((s) => s.value === sort) as SortObject
  )

  const handleChange = (index: number) => {
    setSelected(sorts[index])
    setSort(sorts[index].value)
  }

  return (
    <div className='flex'>
      <Listbox defaultValue={0} onChange={handleChange}>
        <ListboxButton className='flex items-center gap-2'>
          <span className='bg-white font-semibold text-lg dark:bg-zinc-900'>
            Sort
          </span>
          <div className='flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-1 font-semibold dark:bg-zinc-700'>
            {selected.element}
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: 'bottom end', gap: 8 }}
          className='flex flex-col rounded-xl bg-gray-100 px-4 py-2 dark:bg-zinc-700'
          modal={false}
        >
          {sorts.map((s, i) => (
            <ListboxOption
              className='flex items-center justify-end gap-2 data-selected:font-semibold'
              key={s.value}
              value={i}
            >
              {s.element}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}

export default Sort
