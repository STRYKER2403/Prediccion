import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
  return <>
  <Navbar></Navbar>
  <Component {...pageProps} />
  <Footer></Footer>
  </>
}
