export interface UserModel {
  id: string
  email: string
  name: string
  username: string
  role: 'admin' | 'user'
  password: string
  createdAt: Date
  updatedAt: Date
}
