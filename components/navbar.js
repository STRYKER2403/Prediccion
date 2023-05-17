import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    return (
        <div className='shadow-md sticky top-0 bg-white z-20'>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap px-5 py-3 flex-col md:flex-row items-center">
                    <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Image src="/logo-no-background.png" width={95} height={10} alt="" />
                    </Link>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center "> 
                        <Link href={"/"} className="mr-5 focus:text-blue-600 hover:text-blue-600 cursor-pointer">Home</Link> 
                        <Link href={"/market"} className="mr-5 focus:text-blue-600 hover:text-blue-600 cursor-pointer">Market</Link>
                        <Link href={"/analysis"} className="mr-5 focus:text-blue-600 hover:text-blue-600 cursor-pointer">Analysis</Link>
                        <Link href={"/contactus"} className="mr-5 focus:text-blue-600 hover:text-blue-600 cursor-pointer">Contact Us</Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Navbar
