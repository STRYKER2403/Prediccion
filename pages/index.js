import Head from 'next/head'
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
            <div className='md:text-6xl text-3xl text-white font-semibold font-serif '>PREDICCION</div>
            <div className='md:text-4xl text-2xl mb-28 text-white font-semibold font-serif'>Be Technical</div>
          </div>
        </section>

        <section className="text-gray-600 body-font">


          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Unlock the Power of Predictive Investing with our Prediccion</h1>

              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-xl">Navigate the Market with Confidence</p>
            </div>
            <div className="flex flex-wrap -m-4">
              <Link href={"/market"} className="p-4 md:w-1/2">
                <div className=" bg-gray-100 rounded-lg flex h-full p-8 flex-col">
                  <div className='flex items-center mb-3'>
                    <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4 flex-shrink-0">
                    <MonetizationOnIcon className='text-2xl' />
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Market</h2>

                  </div>



                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">The stock market overview provides a snapshot of the current state of the stock market, including key indices, market trends, and notable stock movements. It helps investors and traders stay informed about the overall performance and direction of the market. By analyzing the stock market overview, individuals can gauge market sentiment, identify potential investment opportunities, and make more informed decisions regarding their portfolios.</p>
                  </div>
                </div>
              </Link>

              <Link href={"/analysis"} className="p-4 md:w-1/2"><div >
                <div className=" bg-gray-100 rounded-lg flex h-full p-8 flex-col">
                  <div className='flex items-center mb-3'>
                    <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4 flex-shrink-0">
                    <AutoGraphIcon className='text-2xl' />
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Analysis</h2>
                  </div>
                  <div className='flex-grow'>

                    <p className="leading-relaxed text-base">Stock analysis is the process of evaluating a company's financial and economic data to determine its potential for growth and profitability.In stock analysis, there are two primary approaches: fundamental analysis and technical analysis. By performing a stock analysis overview, investors can make more informed investment decisions, such as buying, holding, or selling a stock. It helps to identify the strengths and weaknesses of a company, understand market trends, and predict future stock price movements.</p>
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
