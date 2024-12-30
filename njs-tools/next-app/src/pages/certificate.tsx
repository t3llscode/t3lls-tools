import Head from 'next/head'
import Image from 'next/image'
import customStyles from './certificate.module.scss'

import { useState, useEffect, useRef } from 'react';

import Header from '../components/multi purpose/header'
import Footer from '../components/multi purpose/footer'
import FileSelect from '../components/certificate creator/fileselect'

export default function Home() {

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Head>
                <title>t3lls certificate creator</title>
                <link rel="icon" href="/data/media/t3.ico" />
            </Head>

            <Header title="Certificate Creator" foreground="rgb(255, 255, 255)" background="rgb(249, 137, 0)"/>

            <div className={customStyles.body} style={{height: 'calc(100vh - 112px)'}}>
                <div className={customStyles.ratio20_80}>
                    <div>
                        <p className={customStyles.box_title}>
                            CONFIG FILE
                        </p>
                        <div>
                            <FileSelect/>
                        </div>
                    </div>
                    <div>
                        <p className={customStyles.box_title}>
                            ELEMENTS IN CONFIG
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className={customStyles.box_title}>
                            CERTIFICATE BUILDER
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className={customStyles.box_title}>
                            PREVIEW
                        </p>
                    </div>
                </div>
            </div>

            <Footer title="Certificate Creator" foreground="rgb(255, 255, 255)" background="rgb(58, 57, 57)"/>

            {/* File Upload or Default Set*/}
                {/* "Slider Check" for File Upload or Default Set */}

                {/* You are using "upload.csv" / the default set*/}

            {/* Two Columns */}
                {/* Drop Down Section */}

                {/* Preview */}

            {/* Export */}

            {/* Footer */}
        </div>
    )

}