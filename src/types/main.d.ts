export interface UserModel {
  id: string
  email: string
  name: string | null
  username: string
  role: 'user' | 'admin'
  password: string
  createdAt: Date
  updatedAt: Date
}
