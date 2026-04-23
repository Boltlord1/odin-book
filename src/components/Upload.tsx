import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import adjustHeight from '../lib/adjustHeight'
import useFiles from '../lib/changeFile'
import { formPost } from '../lib/options'
import Label from './LabelledInput'

const Upload: FunctionComponent = () => {
	const navigate = useNavigate()
	const [files, changeFiles] = useFiles()

	const uploadPost: SubmitEventHandler = async (event) => {
		event.preventDefault()

		const response = await fetch(
			'http://localhost:3000/post',
			formPost(event.target)
		)
		const json = await response.json()

		if (typeof json === 'string') {
			navigate(`/app/post/${json}`)
			return
		}

		console.log(json)
	}

	const title = (
		<textarea
			name='title'
			id='title'
			rows={1}
			onChange={adjustHeight}
			required={true}
			className='outline-0 bg-gray-200 p-2 pl-4 pr-4 rounded-2xl resize-none focus:ring-1 focus:ring-gray-800 focus:shadow-lg'
		/>
	)
	const content = (
		<textarea
			name='content'
			id='content'
			rows={4}
			onChange={adjustHeight}
			className='outline-0 bg-gray-200 p-2 pl-4 pr-4 rounded-2xl resize-none focus:ring-1 focus:ring-gray-800 focus:shadow-lg'
		/>
	)
	const images = (
		<input
			type='file'
			name='images'
			id='images'
			accept='image/png, image/jpeg, image/gif'
			multiple={true}
			onChange={changeFiles}
			className='hidden'
		/>
	)
	const imageLabel = (
		<div className='flex justify-evenly items-center bg-gray-200 p-2 pl-4 pr-4 rounded-2xl text-5xl active:bg-gray-100'>
			<span
				className={`material-symbols-outlined text-gray-${files ? 8 : 4}00`}
			>
				add
			</span>
			<span
				className={`text-gray-${files ? 8 : 6}00 text-2xl text-center min-w-2/3 underline underline-offset-10 decoration-1`}
			>
				{files === null
					? 'No files'
					: typeof files === 'string'
						? files
						: `${files} files`}
			</span>
		</div>
	)

	return (
		<>
			<hr />
			<form onSubmit={uploadPost} className='flex flex-col p-4 gap-3'>
				<Label label='Title' input={title} />
				<Label label='Content' input={content} />
				<Label
					label='Add images (limit: 5)'
					input={images}
					extra={imageLabel}
				/>
				<button type='submit' className='self-end'>
					Create Post
				</button>
			</form>
		</>
	)
}

export default Upload
