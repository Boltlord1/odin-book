import type { ChangeEventHandler } from 'react'

const adjustHeight: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
	const textarea = event.target
	textarea.style.height = 'auto'
	textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
}

export default adjustHeight
