import Head from 'next/head'
import Image from 'next/image' // better than <img> tag
import styles from './header.module.scss'

import { useState, useEffect, useRef } from 'react';

export default function Header({ title, background, foreground }) {

    return (
        <div>
            <div className={styles.header_box} style={{backgroundColor: background}}>
                <div className={styles.box}>
                    <img src="/data/media/icons/t3lls/t3lls.svg" height="16px"/>
                    <p className={styles.header_text} style={{color: foreground}}>
                        {title}
                    </p>
                </div>
                <div className={styles.box}>
                    
                </div>
            </div>
        </div>
    )
}