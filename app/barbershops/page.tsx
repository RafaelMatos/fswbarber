import BarbershopItem from '../(home)/_components/barbershop-item'
import { Search } from '../(home)/_components/search'
import Header from '../_components/header'
import { db } from '../_lib/prisma'

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <div className="flex pb-6 flex-col gap-4">
          <Search />
        </div>
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>
        <div className=" grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4 mt-3">
          {barbershops.map((barbershops) => {
            return (
              <div className="w-full" key={barbershops.id}>
                <BarbershopItem barbershop={barbershops} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage
