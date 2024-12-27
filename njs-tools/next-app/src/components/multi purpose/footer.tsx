import Head from 'next/head'
import Image from 'next/image' // better than <img> tag
import styles from './footer.module.scss'

import { useState, useEffect, useRef } from 'react';

export default function Footer({ title, background, foreground }) {

    return (
        <div>
            <div className={styles.header_box} style={{backgroundColor: background}}>
                <p className={styles.header_text} style={{color: foreground}}>
                    © t3lls by Tell Hensel asdfasdfasdfsafasddfasfsad
                </p>
                <div className={styles.box}>
                    <img src="/data/media/icons/t3lls/t3.svg" height="16px"/>
                </div>
                <p className={styles.header_text} style={{color: foreground}}>
                    made in Germany
                </p>
            </div>
        </div>
    )
}