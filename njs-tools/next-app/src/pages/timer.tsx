import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import customStyles from './timer.module.css'
import Segment from '../components/Segment.tsx';

import { useState, useEffect } from 'react';

export default function Home() {

  const [config, setConfig] = useState([
    {
      name: "outer",
      styles: {
        radius: 50,
        stroke: 3,
        reversed: false,
        background: "#222222",
        foreground: "#FFFFFF",
        gradient: true,
        donecolor: "#00FF00"
      }
    },
    {
      name: "chewing",
      styles: {
        radius: 50,
        stroke: 3,
        reversed: false,
        background: "#222222",
        foreground: "#FFFFFF",
        gradient: true,
        donecolor: "#00FF00"
      }
    },
    {
      name: "inner",
      styles: {
        radius: 50,
        stroke: 3,
        reversed: false,
        background: "#222222",
        foreground: "#FFFFFF",
        gradient: true,
        donecolor: "#00FF00"
      }
    }
  ]);

  const [percentages, setPercentages] = useState({
    outer: {
      tl: 10,
      tr: 90,
      bl: 95,
      br: 100
    },
    chewing: {
      tl: 10,
      tr: 90,
      bl: 95,
      br: 100
    },
    inner: 95
  });

  const segment = [10, 90, 95, 100]
  const circle = [0, 0, 0]
  const rotation = [180, 270, 90, 0]

  return (
    <div className={styles.container}>
      <Head>
        <title>t3lls tooth time</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={customStyles.title}>
          Welcome to my Timer
        </h1>

        <div>
          
          { circle.map((circle, index) => (
            <div className={customStyles.grid2x2}>
              {segment.map((percentage, index) => (
                <Segment radius={200} stroke={3} rotation={rotation[index]} percentage={percentage / 100} reversed={false} background={"#222222"} startC={"#AAAAAA"} endC={"#77FF77"} doneC={"#00FF00"}/>
              ))}
            </div>
          ))}

        </div>


        
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