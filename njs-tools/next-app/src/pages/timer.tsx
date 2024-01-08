import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import customStyles from './timer.module.css'

import Segment from '../components/Segment';
import Cell from '../components/Cell';

import { useState, useEffect, useRef } from 'react';

export default function Home() {

  const [config, setConfig] = useState({
    outer: {
      name: "Outer Surface",
      time: 15,
      styles: {
        radius: 180,
        stroke: 3,
        reversed: true,
        beforecolor: "#222222",
        startcolor: "#555555",
        endcolor: "#AAFFAA",
        donecolor: "#00FF00"
      }
    },
    chewing: {
      name: "Chewing Surface",
      time: 15,
      styles: {
        radius: 170,
        stroke: 3,
        reversed: true,
        beforecolor: "#222222",
        startcolor: "#555555",
        endcolor: "#AAFFAA",
        donecolor: "#00FF00"
      }
    },
    inner: {
      name: "Inner Surface",
      time: 15,
      styles: {
        radius: 160,
        stroke: 3,
        reversed: true,
        beforecolor: "#222222",
        startcolor: "#555555",
        endcolor: "#AAFFAA",
        donecolor: "#00FF00"
      }
    }
  });

  const [percentages, setPercentages] = useState({
    outer: {
      tl: 0,
      tr: 0,
      bl: 0,
      br: 0
    },
    chewing: {
      tl: 0,
      tr: 0,
      bl: 0,
      br: 0
    },
    inner: {
      tl: 0,
      tr: 0,
      bl: 0,
      br: 0
    }
  });

  const [fullfilled, setFullfilled] = useState({
    outer: 0,
    chewing: 0,
    inner: 0
  });

  const totalTime = calcTime(config);

  const order = ["bl", "br", "tr", "tl"]
  const iterateOrder = ["tl", "tr", "bl", "br"]
  const rotation = {
    tl: 180,
    tr: 270,
    bl: 90,
    br: 0
  }

  // - - - COLOR RELATED - - -

  const getColor = (percentage, beforeC, startC, endC, doneC) => {

    if (percentage == 0) {
      return beforeC;
    } else if (percentage == 1) {
      return doneC;
    }

    const r1 = parseInt(startC.slice(1, 3), 16);
    const g1 = parseInt(startC.slice(3, 5), 16);
    const b1 = parseInt(startC.slice(5, 7), 16);

    const r2 = parseInt(endC.slice(1, 3), 16);
    const g2 = parseInt(endC.slice(3, 5), 16);
    const b2 = parseInt(endC.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * percentage);
    const g = Math.round(g1 + (g2 - g1) * percentage);
    const b = Math.round(b1 + (b2 - b1) * percentage);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const calcPercentages = (ms, config: Object) => {
    let tmp = {};
    let time = totalTime - ms;

    Object.entries(config).forEach(([surface, config]) => {
      tmp[surface] = {};

      order.forEach((quadrant) => {
        if (time == 0) {
          tmp[surface][quadrant] = 0;
        } else if (time > config.time * 1000) {
          tmp[surface][quadrant] = 1;
          time -= config.time * 1000;
        } else if (time > 0) {
          tmp[surface][quadrant] = time / (config.time * 1000);
          time = 0;
        }
      });
    });

    calcFullfilled(tmp);

    return tmp;
  }
  
  const calcFullfilled = (percentages) => {
    let tmp = {
      outer: 0,
      chewing: 0,
      inner: 0
    };

    Object.entries(percentages).forEach(([surface, percentages]) => {
      Object.entries(percentages).forEach(([quadrant, percentage]) => {
        if (percentage == 1) {
          tmp[surface] += 1;
        }
      });
    });

    setFullfilled(tmp);
  }

  // - Amount of surfaces that are currently fullfilled
  const calcTotalFullfilled = (fullfilled) => {
    let tmp = 0;

    Object.values(fullfilled).forEach((value: number) => {
      tmp += value;
    });

    return tmp;
  }

  // - Name of the surface that is currently unfullfilled
  const calcCurrentFullfilled = (fullfilled) => {
    let throwIt = null;

    Object.entries(fullfilled).some(([key, value]) => {
      if (value != 4) {
        console.log
        throwIt = [config[key].name, value];
        return true;
      }
    });

    if (throwIt !== null) {
      return throwIt
    }

    let keys = Object.keys(fullfilled);
    return [config[keys[keys.length - 1]].name, 4]
  }

  // - - - TIMER RELATED - - -

  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);

  function calcTime(config: Object) {
    let tmp = 0;

    Object.entries(config).forEach(([surface, config]) => {
      tmp += config.time * 1000 * 4;
    });

    return tmp;
  }

  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    const formattedMinutes = String(minutes).padStart(1, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  // - - - EVENT HANDLERS - - -

  function toggleTimer() {
    if (ms == 0) {
      setMs(totalTime);
    }
    setRunning((previous) => !previous);
  }

  // - - - USE EFFECTS - - -
  
  const intervalRef = useRef();

  useEffect(() => {
    const decrease = async () => {
      if (ms >= 10 && running) {
        intervalRef.current = setInterval(() => {
          setMs(ms - 10);
        }, 8.9) as any;
        setPercentages(calcPercentages(ms, config) as any);
      } else if (ms < 10 && running) {
        setMs(0);
        setPercentages(calcPercentages(ms, config) as any);
        setRunning(false);
      }
    };

    decrease();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [ms, running]);

  // - - - INIT - - -

  useEffect(() => {
    setMs(totalTime);
  }, []);

  // - - - RENDER - - -

  return (
    <div className={customStyles.container}>

      <Head>
        <title>t3lls tooth time</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={customStyles.main}>

        <div className={customStyles.container} onClick={toggleTimer}>
          <div className={customStyles.circles}>
            { Object.entries(config).map(([surface, config]: any) => (
              // - - - ITERATE OVER SURFACES - - -
              <div key={surface} className={customStyles.grid2x2}>
                { iterateOrder.map((quadrant) => (
                  // - - - ITERATE OVER QUADRANTS - - -
                  <Segment
                    radius={config.styles.radius}
                    stroke={config.styles.stroke}
                    rotation={rotation[quadrant]}
                    percentage={percentages[surface][quadrant]}
                    reversed={config.styles.reversed}
                    background={config.styles.beforecolor}
                    foreground={getColor(percentages[surface][quadrant], config.styles.beforecolor, config.styles.startcolor, config.styles.endcolor, config.styles.donecolor)}
                  />
                ))}
              </div>
            ))}
          </div>

          
        </div>

        <div className={customStyles.inside} onClick={toggleTimer}>
          <div className={customStyles.time}>
            { formatTime(ms) }
          </div>
          <div className={customStyles.fullfilment}>
            <Cell tag={ calcCurrentFullfilled(fullfilled)[0] } value={`${ calcCurrentFullfilled(fullfilled)[1] }/4`} width={6.7} />
            <br></br>
            <Cell tag="Total" value={`${ calcTotalFullfilled(fullfilled) }/${ Object.keys(config).length * 4 }`} width={4.3} />
          </div>
        </div>

        <footer className={customStyles.footer}>
          <a href="https://t3l.ls" target="_blank" rel="noopener noreferrer">
            © 2024 t3lls by Tell Hensel
          </a>
        </footer>

      </div>

    </div>
  )
}