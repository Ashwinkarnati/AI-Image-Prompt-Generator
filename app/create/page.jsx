// app/create/page.jsx
import { Suspense } from 'react'
import CreateLogoClient from "./_components/CreateLogoClient"

export default function CreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateLogoClient />
    </Suspense>
  )
}