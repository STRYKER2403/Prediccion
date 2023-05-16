import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'


export default function App({ Component, pageProps }) {

  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {

    router.events.on('routeChangeStart', ()=>{setProgress(40)})
    router.events.on('routeChangeComplete', ()=>{setProgress(100)})

  }, [router.query]);

  return <>
  <LoadingBar
        color='#0E86D4'
        progress={progress}
        waitingTime = {400}
        onLoaderFinished={() => setProgress(0)}
      />
  <Navbar></Navbar>
  <Component {...pageProps} />
  <Footer></Footer>
  </>
}
