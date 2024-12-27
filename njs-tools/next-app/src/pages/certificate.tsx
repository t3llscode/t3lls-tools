import Head from 'next/head'
import Image from 'next/image'
import customStyles from './certificate.module.scss'

import { useState, useEffect, useRef } from 'react';

import Header from '../components/multi purpose/header'
import Footer from '../components/multi purpose/footer'

export default function Home() {


    return (
        <div>
            <Head>
                <title>t3lls certificate creator</title>
                <link rel="icon" href="/data/media/t3.ico" />
            </Head>

            <Header title="Certificate Creator" foreground="#AA0011" background="grey"/>

            <Footer title="Certificate Creator" foreground="white" background="grey"/>

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