import { format } from 'date-fns'
import Header from '../_components/header'
import { ptBR } from 'date-fns/locale'
import { Search } from './_components/search'
import BookingItem from '../_components/booking-item'
import { db } from '../_lib/prisma'
import BarbershopItem from './_components/barbershop-item'
import { User, getServerSession } from 'next-auth'
// import { authOptions } from '../api/auth/[...nextauth]/route'
import Link from 'next/link'
import { authOptions } from '../_lib/authOptions'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany(),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as User).id,
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: 'asc',
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ])
  // const barbershops = await db.barbershop.findMany()

  // const confirmedBookings = session?.user
  //   ? await db.booking.findMany({
  //       where: {
  //         userId: (session.user as User).id,
  //         date: {
  //           gte: new Date(),
  //         },
  //       },
  //       orderBy: {
  //         date: 'asc',
  //       },
  //       include: {
  //         service: true,
  //         barbershop: true,
  //       },
  //     })
  //   : []
  // const confirmedBookings = bookings.filter((booking) => isFuture(booking.date))
  return (
    <div className=" mb-[4.5rem]">
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl  font-bold">Olá,Rafael!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">
          Agendamentos
        </h2>
        <div className="px-5 flex gap-3 overflow-x-auto items-center">
          {confirmedBookings.map((booking) => {
            return <BookingItem key={booking.id} booking={booking} />
          })}
          <Link
            className="text-primary/80 hover:text-primary transition ease-in-out min-w-[12rem]"
            href="/bookings"
          >
            ...outros agendamentos
          </Link>
        </div>
      </div>

      <div className=" mt-6">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )
          })}
        </div>
      </div>

      <div className=" mt-6">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
