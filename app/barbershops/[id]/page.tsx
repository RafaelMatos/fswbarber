import { Button } from '@/app/_components/ui/button'
import { db } from '@/app/_lib/prisma'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import BarbershopInfo from './_components/barbershop-info'
import ServiceItem from './_components/service-item'

export interface IService {
  id: string
  name: string
  price: number
  description: string
  barbershopId: string
  imageUrl: string
}
export interface IBooking {
  id: string
  userId: string
  serviceId: string
  barbershopId: string
  date: string
}
export interface IBarbershop {
  id: string
  name: string
  address: string
  imageUrl: string
  services: IService[]
  bookings: IBooking[]
}

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  if (!params.id) {
    // TODO redirecionar para homepage
    return null
  }
  const barbershop: IBarbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    // TODO redirecionar para homepage
    return null
  }

  return (
    <>
      <BarbershopInfo barbershop={barbershop} />
      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services?.map((service) => {
          return <ServiceItem key={service.id} service={service} />
        })}
      </div>
    </>
  )
}

export default BarbershopDetailsPage
