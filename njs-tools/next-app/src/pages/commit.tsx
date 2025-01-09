import Head from 'next/head'
import customStyles from './certificate.module.scss'

import Header from '../components/multi purpose/header'
import Footer from '../components/multi purpose/footer'
import CommitCreator from '../components/CommitCreator/commit'

export default function Home() {

    return (
        <div>
            <Head>
                <title>t3lls | Commit Creator</title>
                <link rel="icon" href="/data/media/t3.ico" />
            </Head>

            <Header title="Commit Creator" foreground="rgb(255, 255, 255)" background="rgb(249, 137, 0)"/>

            <div style={{height: 'calc(100vh - 112px)'}}>
                
                <CommitCreator/>
            
            </div>

            <Footer left="t3lls | Software Solutions" right="© t3lls by Tell Hensel" foreground="rgb(255, 255, 255)" background="rgb(58, 57, 57)"/>
        </div>
    )

}