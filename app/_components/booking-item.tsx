'use client'
import { Prisma } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'
import { Button } from './ui/button'
import { cancelBooking } from '../_actions/cancel-bookings'
import { toast } from 'sonner'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import FswSheetHeader from './ui/fsw-sheet-header'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from './ui/alert-dialog'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: true; barbershop: true }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const isBookingConfirmed = isFuture(booking.date)

  const handleCancelClick = async () => {
    setIsDeleteLoading(true)
    try {
      await cancelBooking(booking.id)

      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
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
      </SheetTrigger>

      <SheetContent className="px-0 py-0">
        <FswSheetHeader title="Informacões da Reserva" />
        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6 ">
            <Image
              src={process.env.NEXT_PUBLIC_MAP_IMG_URL!}
              // src="map.png"
              fill
              style={{ objectFit: 'contain', borderRadius: '5px' }}
              alt={booking.barbershop.name}
            />
            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs text-gray-400">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? 'default' : 'secondary'}
            className=" w-fit mt-3 mb-3"
          >
            {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>

          <Card>
            <CardContent className="flex flex-col p-3 gap-3">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(booking.service.price))}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Data</h3>
                <h4 className="text-sm ">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </h4>
              </div>
              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Horário</h3>
                <h4 className="text-sm ">
                  {format(booking.date, 'hh:mm', { locale: ptBR })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                <h4 className="text-sm ">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>
        </div>
        <SheetFooter className="flex-row gap-3 px-5 mt-6">
          <SheetClose asChild>
            <Button className="w-full" variant="secondary">
              Voltar
            </Button>
          </SheetClose>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full"
                variant="destructive"
                // onClick={handleCancelClick}
                disabled={!isBookingConfirmed || isDeleteLoading}
              >
                {isDeleteLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Cancelar reserva
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%] text-center">
              <AlertDialogHeader className="">
                <AlertDialogTitle className="text-center">
                  Cancelar reserva
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Tem certeza que deseja cancelar esse agendamento?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row gap-3">
                <AlertDialogCancel className="w-full mt-0">
                  Voltar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-full mt-0"
                  onClick={handleCancelClick}
                  disabled={isDeleteLoading}
                >
                  {isDeleteLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
