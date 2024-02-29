import { format } from 'date-fns'
import Header from '../_components/header'
import { ptBR } from 'date-fns/locale'
import { Search } from './_components/search'
import BookingItem from '../_components/booking-item'
import { db } from '../_lib/prisma'
import BarbershopItem from './_components/barbershop-item'
import { User, getServerSession } from 'next-auth'
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
  return (
    <div className=" mb-[4.5rem]">
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl  font-bold">{`Olá, ${session?.user ? session.user.name : 'meu consagrado'}`}</h2>
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
          {session?.user ? (
            <>
              {confirmedBookings.map((booking) => {
                return <BookingItem key={booking.id} booking={booking} />
              })}

              {confirmedBookings.length > 0 ? (
                <Link
                  className="text-primary/80 hover:text-primary transition ease-in-out min-w-[12rem]"
                  href="/bookings"
                >
                  ...outros agendamentos
                </Link>
              ) : (
                <p className="text-gray-500 text-sm">
                  Opa, parece que você ainda não tem nenhum agendamento...
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-sm">Necessário realizar o login</p>
          )}
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
