"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>{session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return <button onClick={() => signIn("google")}>Sign in</button>
}
