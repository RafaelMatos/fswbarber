'use client'
import { Button } from '@/app/_components/ui/button'
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Barbershop } from '@prisma/client'
import { SheetTrigger, SheetContent, Sheet } from '@/app/_components/ui/sheet'
import SideMenu from '@/app/_components/ui/side-menu'
import { useState } from 'react'

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter()

  const [hoveredAddress, setHoveredAddress] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(false)

  const handleMouseEnterAddress = () => {
    setHoveredAddress(true)
  }

  const handleMouseLeaveAddress = () => {
    setHoveredAddress(false)
  }
  const handleMouseEnterRating = () => {
    setHoveredRating(true)
  }

  const handleMouseLeaveRating = () => {
    setHoveredRating(false)
  }

  const handleBackClick = () => {
    router.replace('/')
  }
  return (
    <>
      <div className="h-[250px] w-full relative">
        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="z-50 absolute top-4 right-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          fill
          style={{ objectFit: 'cover' }}
          alt={barbershop.name}
          className="opacity-85"
        />
      </div>
      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div
          className="flex item-center gap-2 mt-2 w-fit"
          onMouseEnter={handleMouseEnterAddress}
          onMouseLeave={handleMouseLeaveAddress}
        >
          <MapPinIcon
            className={`${hoveredAddress ? 'text-primary animate-bounce' : 'text-primary'}`}
            size={18}
          />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div
          className="flex item-center gap-2 mt-2 w-fit"
          onMouseEnter={handleMouseEnterRating}
          onMouseLeave={handleMouseLeaveRating}
        >
          <StarIcon
            className={`fill-primary ${hoveredRating ? 'text-primary animate-pulse' : 'text-primary'}`}
            size={18}
          />
          <p className="text-sm">5,0 (89 Avaliações)</p>
        </div>
      </div>
    </>
  )
}

export default BarbershopInfo
