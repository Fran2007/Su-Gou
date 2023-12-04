import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/libs/db'
import bcrypt from 'bcrypt'
import type { UserModel } from '@/types/main'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' }
      },
      async authorize (credentials) {
        if (credentials?.email === null || credentials?.email === undefined) {
          throw new Error('Credenciales invalidas')
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        })

        if (user === null || user === undefined) {
          throw new Error('No existe el usuario')
        }

        if (credentials?.password === null || credentials?.password === undefined) {
          throw new Error('Credenciales invalidas')
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) {
          throw new Error('Credenciales invalidas')
        }

        const sessionUser = {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          username: user.username,
          role: user.role as 'user' | 'admin',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }

        return sessionUser as UserModel
      }
    })
  ],
  callbacks: {
    jwt ({ token, user }) {
      if (user !== undefined) token.user = user
      return token
    },
    session ({ session, token }) {
      session.user = token?.user as UserModel
      return session
    }
  }
}
