import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        
        <div className="bg-white drop-shadow-2xl">       
            <footer className="text-gray-600 body-font">
            <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
                <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image src="/logo-no-background.png" width={80} height={5} alt="" />
                    </Link>
                    <span className="ml-2 text-xl">Prediccion</span>
                </div>
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 Prediccion — All Rights Reserved
                </p>
                
            </div>
        </footer>
        </div>
    )
}

export default Footer
