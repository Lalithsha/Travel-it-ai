"use client"


import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function Home() {

  const router = useRouter()

  return (
    <div>
      This is welcome page.

      <div>
        <Button onClick={() => router.push('/newplan')} > New Plan</Button>
      </div>



    </div >
  )
}
