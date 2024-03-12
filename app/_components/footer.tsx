import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <div className="w-full flex justify-between bg-secondary py-6 px-5">
        <p className="text-gray-400 text-xs opacity-75">
          Developed by
          <span className="font-bold">
            <Link href={process.env.NEXT_PUBLIC_GITHUB!}> @RafaelMatos</Link>
          </span>
        </p>
        <p className="text-gray-400 text-xs opacity-75">
          © 2023 Copyright <span className="font-bold">FSW Barber</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
