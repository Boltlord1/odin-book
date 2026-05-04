interface EmailIdentity {
  data: {
    verified: boolean
  }
  id: string
  provider: 'Email'
}

interface GoogleIdentity {
  data: {
    email: string
  }
  id: string
  provider: 'Google'
}

interface GithubIdentity {
  data: {
    username: string
    url: string
  }
  id: string
  provider: 'Github'
}

type Identity = EmailIdentity | GoogleIdentity | GithubIdentity

export type { Identity }
