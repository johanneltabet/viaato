import { useState, useEffect } from 'react'

import { auth, usersCollection } from '~/firebase'

export interface UserTypes {
  id: string
  image?: string
  name?: string
}

export interface LoginTypes {
  email: string
  password: string
}

export interface RegisterTypes {
  username: string
  email: string
  password: string
}

export async function logUser({ email, password }: LoginTypes) {
  await auth.signInWithEmailAndPassword(email, password)
}

export async function createUser({
  username,
  email,
  password,
}: RegisterTypes) {
  const { user } = await auth.createUserWithEmailAndPassword(
    email,
    password,
  )
  if (!user) return
  usersCollection.doc(user.uid).set({ name: username })
}

export async function resetPassword({ email }: { email: string }) {
  await auth.sendPasswordResetEmail(email)
}

export async function logOut() {
  await auth.signOut()
}

export default function userProvider() {
  const [user, setUser] = useState<UserTypes | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null)
        setIsLoading(false)
        return
      }
      const userProfile = await usersCollection.doc(user.uid).get()
      const userData = userProfile.data()
      setUser({ ...userData, id: userProfile.id } as UserTypes)
      setIsLoading(false)
    })
  }, [])

  return [user, isLoading]
}
