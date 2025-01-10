import Head from 'next/head'
import customStyles from './certificate.module.scss'

import Header from '../components/multi purpose/header'
import Footer from '../components/multi purpose/footer'
// import SQLQueryCreator from '../components/SQLQueryCreator'

export default function Home() {

    let config = {}

    return (
        <div>
            <Head>
                <title>t3lls SQL Query Creator</title>
                <link rel="icon" href="/data/media/t3.ico" />
            </Head>

            <Header title="SQL Query Creator" foreground="rgb(255, 255, 255)" background="rgb(249, 137, 0)"/>

            <div className={customStyles.body} style={{height: 'calc(100vh - 112px)'}}>
                
                {/* <SQLQueryCreator config={config}/> */}
            
            </div>

            <Footer left="t3lls | Software Solutions" right="© t3lls by Tell Hensel" foreground="rgb(255, 255, 255)" background="rgb(58, 57, 57)"/>
        </div>
    )

}