import { FileArrowUpIcon } from '@phosphor-icons/react'
import type { ChangeEventHandler, FunctionComponent } from 'react'

interface Props {
	name: string
	accept: string
	multiple: boolean
	files: number | string | null
	changeFiles: ChangeEventHandler<HTMLInputElement>
}

const File: FunctionComponent<Props> = ({
	name,
	accept,
	multiple,
	files,
	changeFiles
}) => {
	return (
		<label
			htmlFor={name}
			className='flex justify-evenly items-center bg-gray-200 p-2 pl-4 pr-4 rounded-2xl text-5xl active:bg-gray-100'
		>
			<input
				type='file'
				name={name}
				id={name}
				accept={accept}
				multiple={multiple}
				onChange={changeFiles}
				className='hidden'
			/>
			<FileArrowUpIcon
				weight='bold'
				className={`icon ${files ? 'uploaded' : 'upload'}`}
			/>
			<span
				className={`text-gray-${files ? 8 : 6}00 text-2xl text-center min-w-2/3 underline underline-offset-10 decoration-1`}
			>
				{files === null
					? 'No files'
					: typeof files === 'string'
						? files
						: `${files} files`}
			</span>
		</label>
	)
}

export default File
