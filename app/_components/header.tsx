'use client'
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'
import { Avatar, AvatarImage } from './ui/avatar'
import NoUserAvatar from './icons/no-user-avatar'
import Fsw from './icons/fsw'
import Link from 'next/link'
import SideMenu from './ui/side-menu'
const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between items-center">
        <Image src="/Logo.png" alt="FSW Barber" height={22} width={120} />

        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="icon" className="w-8 h-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
