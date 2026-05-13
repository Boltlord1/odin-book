type Type = 'submit' | 'change' | 'blur'
type ValidateFunction = (value: string, type: Type) => string[] | undefined

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexLower = /[a-z]/
const regexUpper = /[A-Z]/
const regexNumber = /\d/

function Validator() {
  let pass = ''

  const username: ValidateFunction = (value, type) => {
    const errors: string[] = []
    if (value.length > 32) {
      errors.push('Username must be between 4 and 32 characters')
    } else if (type !== 'change' && value === '') {
      errors.push('Username is required')
    } else if (type !== 'change' && value.length < 4) {
      errors.push('Username must be between 4 and 32 characters')
    }

    return errors.length > 0 ? errors : undefined
  }

  const display: ValidateFunction = (value, type) => {
    const errors: string[] = []
    if (value.length > 32) {
      errors.push('Display name must be between 2 and 32 characters')
    } else if (type !== 'change' && value.length < 2 && value) {
      errors.push('Display name must be between 2 and 32 characters')
    }

    return errors.length > 0 ? errors : undefined
  }

  const email: ValidateFunction = (value, type) => {
    const errors: string[] = []
    if (type === 'change') {
      return
    }

    if (!value) {
      errors.push('Email is required')
    } else if (!regexEmail.test(value)) {
      errors.push('Invalid email')
    }

    return errors.length > 0 ? errors : undefined
  }

  const password: ValidateFunction = (value, type) => {
    pass = value

    const errors: string[] = []
    if (value.length > 32) {
      errors.push('Password must be between 6 and 32 characters')
    } else if (type !== 'change' && value === '') {
      errors.push('Password is required')
    } else if (type !== 'change' && value.length < 6) {
      errors.push('Password must be between 6 and 32 characters')
    }

    const base = 'Password must contain '
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
      errors.push(`${base + extras.join(', ')} and ${last}`)
    } else if (extras.length > 0) {
      errors.push(base + extras.join(' and '))
    }

    return errors.length > 0 ? errors : undefined
  }

  const confirm: ValidateFunction = (value, type) => {
    const errors: string[] = []
    if (type === 'change') {
      return
    }

    if (pass !== value) {
      errors.push('Passwords do not match')
    }

    return errors.length > 0 ? errors : undefined
  }

  return { username, display, email, password, 'confirm-password': confirm }
}

const validator = Validator()

export default validator
