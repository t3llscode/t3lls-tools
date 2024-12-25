import Head from 'next/head'
import Image from 'next/image'
import customStyles from './certificate.module.scss'

import { useState, useEffect, useRef } from 'react';

import Header from '../components/multi purpose/header'

export default function Home() {


    return (
        <div>
            <Head>
                <title>t3lls certificate creator</title>
                <link rel="icon" href="/data/media/t3.ico" />
            </Head>



            {/* Header */}
            

            <img src="/data/media/icons/t3lls/t3lls.svg" height="16px"/>
            <div>
                <div>
                    before
                </div>
                <Header title="Certificate Creator"/>
                <div>
                    after
                </div>
            </div>

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