import db from './db'
import type { UserModel } from '@/types/main'
import bcrypt from 'bcrypt'

export async function Register (data: UserModel) {
  const { email, name, username, role, password } = data
  const isVoid = [email, name, username, password]

  if (isVoid.includes('')) {
    throw new Error('Todos los campos son obligatorios')
  }

  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres')
  }

  if (role !== 'admin' && role !== 'user') {
    throw new Error('El rol debe ser admin o user')
  }

  try {
    const emailAlreadyExists = await db.user.findUnique({
      where: { email } 
    })

    if (emailAlreadyExists) {
      throw new Error('El usuario ya existe')
    }

    const usernameAlreadyExists = await db.user.findUnique({
      where: { username }
    })

    if (usernameAlreadyExists) {
      throw new Error('El nombre de usuario ya existe')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    if (!hashPassword) {
      throw new Error('Error al encriptar la contraseña')
    }

    const newUser = await db.user.create({
      data: {
        email,
        name,
        username,
        role,
        password: hashPassword
      }
    })

    const { password: _, ...user } = newUser

    return user
  } catch (error) {
    console.log(error)
    return {}
  }
}
