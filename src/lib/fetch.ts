const options: RequestInit = { method: 'get', credentials: 'include' }

function signalOptions(controller: AbortController) {
  const options: RequestInit = {
    method: 'get',
    credentials: 'include',
    signal: controller.signal
  }

  return options
}

function jsonOptions(form: HTMLFormElement, method: 'post' | 'put' = 'post') {
  const data = new FormData(form)
  const obj = Object.fromEntries(data.entries())
  const options: RequestInit = {
    method,
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(obj)
  }

  return options
}

function formOptions(form: HTMLFormElement, method: 'post' | 'put' = 'post') {
  const data = new FormData(form)
  const options: RequestInit = { method, credentials: 'include', body: data }

  return options
}

function toggleOptions(bool: boolean, signal: AbortSignal) {
  const options: RequestInit = {
    method: bool ? 'post' : 'delete',
    credentials: 'include',
    signal
  }

  return options
}

export { formOptions, jsonOptions, options, signalOptions, toggleOptions }
