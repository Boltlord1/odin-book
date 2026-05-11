import type { Dispatch, FunctionComponent, SetStateAction } from 'react'

interface Props {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const Search: FunctionComponent<Props> = ({ search, setSearch }) => (
  <>
    <input
      className='min-w-0 flex-1 rounded-xl bg-gray-100 px-6 py-1 outline-none'
      onChange={(e) => setSearch(e.target.value)}
      placeholder='Search...'
      type='search'
      value={search}
    />
    {search && (
      <button
        className='rounded-xl bg-gray-100 px-6 py-1 font-semibold'
        onClick={() => setSearch('')}
        type='button'
      >
        Clear
      </button>
    )}
  </>
)

export default Search
