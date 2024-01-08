import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Segment from '../components/Segment.tsx';

export default function Home() {

  const percentages = [25, 50, 75, 100];

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my Timer
        </h1>
        <Segment radius={50} stroke={3} percentage={0.5} reversed={false}/>
        
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2024 t3lls by Tell Hensel
        </a>
      </footer>
    </div>
  )
}