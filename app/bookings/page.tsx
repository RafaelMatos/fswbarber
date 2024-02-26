import { getServerSession } from 'next-auth'
import Header from '../_components/header'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { User } from '@prisma/client'
import { db } from '../_lib/prisma'
import BookingItem from '../_components/booking-item'
import { isFuture, isPast } from 'date-fns'

const BookingsPage = async () => {
  // recuperar a sessão de usuário (ver se ele está logado ou não)
  const session = await getServerSession(authOptions)

  // se ele não estiver logado, redirecionar para página de login ou inicial
  if (!session?.user) {
    return redirect('/')
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as User).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: 'asc',
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as User).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: 'asc',
      },
    }),
  ])

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Confirmados
        </h2>
        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => {
            return <BookingItem key={booking.id} booking={booking} />
          })}
        </div>
        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Finalizados
        </h2>
        <div className="flex flex-col gap-3">
          {finishedBookings.map((booking) => {
            return <BookingItem key={booking.id} booking={booking} />
          })}
        </div>
      </div>
    </>
  )
}

export default BookingsPage
