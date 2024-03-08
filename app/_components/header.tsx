'use client'
import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideMenu from './ui/side-menu'
import Link from 'next/link'
const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="p-5 flex flex-row justify-between items-center">
          <Link href="/">
            <Image src="/Logo.svg" alt="FSW Barber" height={22} width={120} />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
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
    </header>
  )
}

export default Header
