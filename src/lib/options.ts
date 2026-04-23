function jsonPost(form: HTMLFormElement) {
	const data = new FormData(form)
	const obj = Object.fromEntries(data.entries())
	const options: RequestInit = {
		method: 'post',
		headers: { 'content-type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(obj)
	}

	return options
}

function formPost(form: HTMLFormElement) {
	const data = new FormData(form)
	const options: RequestInit = {
		method: 'post',
		credentials: 'include',
		body: data
	}

	return options
}

export { formPost, jsonPost }
