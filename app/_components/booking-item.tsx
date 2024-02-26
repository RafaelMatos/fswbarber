import { Booking, Prisma } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: true; barbershop: true }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date)

  return (
    <Card>
      <CardContent className="flex px-0 py-0 min-w-[20rem]">
        <div className="flex flex-col flex-[3] gap-2 py-5 pl-5">
          <Badge
            variant={isBookingConfirmed ? 'default' : 'secondary'}
            className=" w-fit"
          >
            {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>

          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />

              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center border-l border-solid border-secondary ">
          <p className="text-sm capitalize">
            {format(booking.date, 'MMMM', { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, 'dd')}</p>
          <p className="text-sm">{format(booking.date, 'HH:mm')}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
