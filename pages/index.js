import Head from 'next/head'
import { TbPlant2 } from 'react-icons/Tb';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <div className='min-h-screen bg-white'>
        <Head>
          <title>Prediccion</title>
          <meta name="description" content="Prediccion" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className="text-gray-600 body-font ">

          <div className="flex bg-back bg-no-repeat bg-cover bg-center bg-fixed h-[80vh] opacity-90 text-center items-center justify-center flex-col">
            <div className='md:text-6xl text-3xl text-black font-semibold font-serif '>PREDICCION</div>
            <div className='md:text-4xl text-2xl mb-28 text-black font-semibold font-serif'>Be Technical</div>
          </div>
        </section>

        <section className="text-gray-600 body-font">


          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Get Work Done With Agro Solutions</h1>

              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-xl">Adding blue To Life</p>
            </div>
            <div className="flex flex-wrap -m-4">
              <Link href={"/markettrends"} className="p-4 md:w-1/2">
                <div className=" bg-gray-100 rounded-lg flex h-full p-8 flex-col">
                  <div className='flex items-center mb-3'>
                    <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4 flex-shrink-0">
                      <EqualizerIcon className='text-2xl' />
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Market Trends</h2>

                  </div>



                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">Get Information About Latest Market Trends of Crops and Plan your sale accordingly.</p>
                  </div>
                </div>
              </Link>

              <Link href={"/articles"} className="p-4 md:w-1/2"><div >
                <div className=" bg-gray-100 rounded-lg flex h-full p-8 flex-col">
                  <div className='flex items-center mb-3'>
                    <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4 flex-shrink-0">
                      <ImportContactsIcon className='text-2xl' />
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Read Articles</h2>
                  </div>
                  <div className='flex-grow'>

                    <p className="leading-relaxed text-base">Stay Updated with every agriculture related news and policies implemented.</p>
                  </div>
                </div>
              </div></Link>
            </div>

          </div>
        </section>


      </div>
    </>
  )
}
