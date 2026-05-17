type EventType = 'submit' | 'change' | 'blur'

type ValidateString<Extra extends unknown[] = []> = (
  type: EventType,
  value: string,
  ...args: Extra
) => string

const validate: ValidateString<
  [string, boolean | undefined, number, number]
> = (type, value, label, required, min, max) => {
  if (value.length > max) {
    return `${label} is too long. It must be ${min > 1 ? `between ${min} and` : 'less than'} ${max} characters`
  }
  if (required && type !== 'change' && value === '') {
    return `${label} is required`
  }
  if (type !== 'change' && value.length > 0 && value.length < min) {
    return `${label} is too short. It must be between ${min} and ${max} characters`
  }
  return ''
}

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const email: ValidateString = (_type, value) => {
  if (!value) {
    return 'Email is required'
  }
  if (!regexEmail.test(value)) {
    return 'Invalid email text'
  }
  return ''
}

const regexLower = /[a-z]/
const regexUpper = /[A-Z]/
const regexNumber = /\d/

const password: ValidateString = (type, value) => {
  const base = validate(type, value, 'Password', true, 6, 32)

  const merge = base ? `${base} and must contain ` : 'Password must contain '
  const extras: string[] = []
  if (!regexLower.test(value)) {
    extras.push('a lowercase letter')
  }
  if (!regexUpper.test(value)) {
    extras.push('an uppercase letter')
  }
  if (!regexNumber.test(value)) {
    extras.push('a number')
  }
  if (extras.length === 3) {
    const last = extras.pop()
    return `${merge + extras.join(', ')} and ${last}`
  }
  if (extras.length > 0) {
    return merge + extras.join(' and ')
  }

  return base
}

export { email, password, validate }
