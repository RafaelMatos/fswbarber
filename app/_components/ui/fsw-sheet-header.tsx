import { SheetHeader, SheetTitle } from './sheet'
import Fsw from '../icons/fsw'

interface FswSheetHeaderProps {
  title: string
}

const FswSheetHeader = ({ title }: FswSheetHeaderProps) => {
  return (
    <SheetHeader className="px-5 text-left py-6 border-b border-solid border-secondary">
      <SheetTitle className=" flex flex-row gap-3 items-center">
        <Fsw />
        {title}
      </SheetTitle>
    </SheetHeader>
  )
}

export default FswSheetHeader
