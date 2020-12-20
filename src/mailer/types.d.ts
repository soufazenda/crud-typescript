export interface EmailConfirmation {
  to: string
  subject?: string
  token: string
  username: string
}
