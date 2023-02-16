import Head from 'next/head'
import Homepage from '../components/homePage'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Jack's projects</title>
        <meta name="nxt" content="logi / signup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Homepage />
    </div>
  )
}
