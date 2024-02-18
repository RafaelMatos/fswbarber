import { Card, CardContent } from '@/app/_components/ui/card'
import { IService } from '../page'
import Image from 'next/image'
import { Button } from '@/app/_components/ui/button'

interface ServiceItemProps {
  service: IService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
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
                }).format(service.price)}
              </p>
              <Button variant="secondary">Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
