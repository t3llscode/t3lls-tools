import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>t3lls Tools</title>
        <link rel="icon" href="https://data.t3l.ls/media/t3.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my Tools.
        </h1>
        <br></br>
        <a href="https://tools.t3l.ls/timer">
          Click here to get to the Timer.
        </a>
      </main>
    </div>
  )
}