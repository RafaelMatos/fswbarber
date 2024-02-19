'use client'

import { LogOutIcon, LogInIcon, HomeIcon, CalendarIcon } from 'lucide-react'
import Fsw from '../icons/fsw'
import NoUserAvatar from '../icons/no-user-avatar'
import { Button } from './button'
import { SheetHeader } from './sheet'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarImage } from './avatar'
import Link from 'next/link'

const SideMenu = () => {
  const { data } = useSession()

  const handleLoginClick = async () => {
    await signIn('google')
  }
  const handleLogoutClick = async () => {
    await signOut()
  }

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <Fsw />
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between items-center  px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              {data.user?.image ? (
                <AvatarImage src={data.user?.image} />
              ) : (
                <NoUserAvatar />
              )}
            </Avatar>
            <h2>{`Olá, ${data.user.name}`}</h2>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="text-destructive hover:opacity-80 hover:text-destructive "
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-3 ">
            <NoUserAvatar />
            <h2>Olá. Faça seu login</h2>
          </div>
          <Button
            variant="secondary"
            className="w-full gap-2"
            onClick={handleLoginClick}
          >
            <LogInIcon size={18} />
            Fazer login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}

export default SideMenu
