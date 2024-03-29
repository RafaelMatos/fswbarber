'use client'
import { Card, CardContent } from '@/app/_components/ui/card'
import Image from 'next/image'
import { Button } from '@/app/_components/ui/button'
import { Barbershop, Booking, Service } from '@prisma/client'
import { signIn, useSession } from 'next-auth/react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/app/_components/ui/sheet'
import { useEffect, useMemo, useState } from 'react'
import { Calendar } from '@/app/_components/ui/calendar'
import { ptBR } from 'date-fns/locale'
import { generateDayTimeList } from '../_helpers/hours'
import { addDays, format, setHours, setMinutes } from 'date-fns'
import { saveBooking } from '../_actions/save-booking'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getDayBookings } from '../_actions/get-day-bookings'
import FswSheetHeader from '@/app/_components/ui/fsw-sheet-header'

interface ServiceItemProps {
  service: Service
  barbershop: Barbershop
  isAuthenticated?: boolean
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const { data } = useSession()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [submitIsloading, setSubmitIsLoading] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const router = useRouter()

  console.log(dayBookings)
  useEffect(() => {
    if (!date) {
      return
    }

    const refreshAvailavbleHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date)

      setDayBookings(_dayBookings)
    }

    refreshAvailavbleHours()
  }, [date, barbershop.id])

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn('google')
    }
    // TODO abrir modal de agendamento
  }

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true)
    try {
      if (!hour || !date || !data?.user) {
        return
      }

      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      })

      setSheetIsOpen(false)

      setHour(undefined)
      setDate(undefined)

      const toastDateMessage = format(
        newDate,
        "'Para' dd 'de' MMMM 'às' HH':'mm'.'",
        { locale: ptBR },
      )
      // console.log(toastDateMessage)
      toast('Reserva realizada', {
        description: toastDateMessage,
        action: {
          label: 'Visualizar',
          onClick: () => router.push('/bookings'),
        },
      })
    } catch (error) {
      console.error(error)
      toast('Oh não! Algo deu errado', {
        description: 'Desculpa, não conseguimos fazer sua reserva',
        // action: {
        //   label: 'Visualizar',
        //   onClick: () => router.push('/bookings'),
        // },
      })
    } finally {
      setSubmitIsLoading(false)
    }
  }

  const handleDateClick = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setHour(undefined)
  }
  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const timeList = useMemo(() => {
    if (!date) {
      return []
    }
    return generateDayTimeList(date).filter((time) => {
      // se houver reserva em 'dayBookings' com a hora em minutos igual a time, não incluir
      const timeHour = Number(time.split(':')[0])
      const timeMinutes = Number(time.split(':')[1])

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })

      if (!booking) {
        return true
      }
      return false
    })
  }, [date, dayBookings])

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-w-[110px] max-h-[110px]">
            <Image
              src={service.imageUrl}
              className="rounded-lg"
              fill
              style={{ objectFit: 'contain' }}
              alt={service.name}
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-bold te">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-primary font-bold text-sm">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                {isAuthenticated ? (
                  <SheetTrigger asChild>
                    <Button variant="secondary" disabled={!isAuthenticated}>
                      Reservar
                    </Button>
                  </SheetTrigger>
                ) : (
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                )}

                <SheetContent className="p-0 w-full overflow-y-scroll">
                  <FswSheetHeader title="Fazer reserva" />

                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      className="mt-6 rounded-md"
                      fromDate={addDays(new Date(), 1)}
                      locale={ptBR}
                      styles={{
                        head_cell: {
                          width: '100%',
                          textTransform: 'capitalize',
                        },
                        cell: {
                          width: '100%',
                        },
                        button: {
                          width: '100%',
                        },

                        nav_button_previous: {
                          width: '2rem',
                          height: '2rem',
                        },
                        nav_button_next: {
                          width: '2rem',
                          height: '2rem',
                        },
                        caption: {
                          color: 'hsl(var(--primary))',
                          textTransform: 'capitalize',
                        },
                      }}
                    />
                  </div>

                  {/* Mostrar lista de horários apenas 
                  se alguma data estiver selecionada */}

                  {date && (
                    <div
                      className="flex overflow-x-auto 
                      [&::-webkit-scrollbar]:hidden gap-3 py-6 px-5 border-t 
                      border-solid border-secondary "
                    >
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          variant={hour === time ? 'default' : 'outline'}
                          className="rounded-full"
                          onClick={() => handleHourClick(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="flex flex-col p-3 gap-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">
                            {Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(Number(service.price))}
                          </h3>
                        </div>
                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Data</h3>
                            <h4 className="text-sm ">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h4>
                          </div>
                        )}
                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Horário</h3>
                            <h4 className="text-sm ">{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">Barbearia</h3>
                          <h4 className="text-sm ">{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className="px-5">
                    <Button
                      className="w-full"
                      disabled={!hour || !date || submitIsloading}
                      onClick={handleBookingSubmit}
                    >
                      {submitIsloading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
