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
import { options } from '../../lib/options'
import type { CommentData, PostData } from '../../types/data'

interface Props {
  path: string
  setSort:
    | Dispatch<SetStateAction<PostData[]>>
    | Dispatch<SetStateAction<CommentData[]>>
}

const sorts = [
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

const Sort: FunctionComponent<Props> = ({ path, setSort }) => {
  const [selected, setSelected] = useState(sorts[0])
  const handleChange = async (index: number) => {
    const sort = sorts[index]
    setSelected(sort)
    const response = await fetch(`${path}?sort=${sort.value}`, options)

    if (response.ok) {
      const json = await response.json()
      setSort(json)
      return
    }

    console.log(response)
  }

  return (
    <div className='flex px-4'>
      <Listbox defaultValue={0} onChange={handleChange}>
        <ListboxButton className='flex items-center gap-2'>
          <span className='bg-white font-semibold text-lg'>Sort</span>
          <div className='flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-1 font-semibold'>
            {selected.element}
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor={{
            to: 'bottom end',
            gap: 8
          }}
          className='flex flex-col rounded-xl bg-gray-100 px-4 py-2'
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
