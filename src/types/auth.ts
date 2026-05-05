export interface LoginFormData {
  email: string
  password: string
}

export type SocialProvider = 'google' | 'github' | 'microsoft' | 'email'
