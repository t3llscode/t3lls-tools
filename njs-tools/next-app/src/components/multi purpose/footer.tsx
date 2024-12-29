import Head from 'next/head'
import Image from 'next/image' // better than <img> tag
import styles from './footer.module.scss'

import { useState, useEffect, useRef } from 'react';

export default function Footer({ title, background, foreground }) {

    return (
        <div>
            <div className={styles.header_box} style={{backgroundColor: background}}>
                <p className={styles.header_text} style={{color: foreground, textAlign: 'left'}}>
                    © t3lls by Tell Hensel
                </p>
                <div className={styles.box}>
                    <a href="https://www.t3l.ls" target="_blank">
                        <img className={styles.t3} src="/data/media/icons/t3lls/t3.svg" height="16px"/>
                    </a>
                </div>
                <p className={styles.header_text} style={{color: foreground, textAlign: 'right'}}>
                    made in Germany
                </p>
            </div>
        </div>
    )
}