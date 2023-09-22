"use client"


// import { useRouter } from 'next/navigation'

// import { Button } from '@/components/ui/button'
import { LandingNavbar } from '@/components/landing-navbar'
import { LandingHero } from '@/components/landing-hero'

export default function Home() {

  // const router = useRouter()

  document.body.style.overflow = 'hidden';
  
  return (
    <div className="h-screen bg-pink-100 "  >
      {/* This is welcome page. */}
      <LandingNavbar />
      <LandingHero />
    </div >
  )
}


{/* <div>
        <Button onClick={() => router.push('/newplan')} > New Plan</Button>
</div> */}

