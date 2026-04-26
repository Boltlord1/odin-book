import { FileArrowUpIcon } from '@phosphor-icons/react'
import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import adjustHeight from '../lib/adjustHeight'
import useFiles from '../lib/changeFile'
import { formOptions } from '../lib/options'
import { backendUrl } from '../lib/variables'
import File from './general/File'
import Label from './general/Label'

const Upload: FunctionComponent = () => {
	const navigate = useNavigate()
	const [files, changeFiles] = useFiles()

	const uploadPost: SubmitEventHandler = async (event) => {
		event.preventDefault()

		const response = await fetch(
			`${backendUrl}/post`,
			formOptions(event.target)
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

	return (
		<>
			<hr />
			<form onSubmit={uploadPost} className='flex flex-col p-4 gap-3'>
				<Label label='Title' input={title} />
				<Label label='Content' input={content} />
				<File
					name='images'
					accept='image/png, image/jpeg, image/gif'
					multiple={true}
					files={files}
					changeFiles={changeFiles}
				/>
				<button type='submit' className='self-end'>
					Create Post
				</button>
			</form>
		</>
	)
}

export default Upload
