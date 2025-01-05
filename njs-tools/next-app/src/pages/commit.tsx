import Head from 'next/head'
import Image from 'next/image'
import customStyles from './commit.module.scss'

import { useState, useEffect, useRef } from 'react';

import Header from '../components/multi purpose/header'
import Footer from '../components/multi purpose/footer'

export default function Home() {

    const [commitMessage, setCommitMessage] = useState<string>('');

    return (
        <div className={customStyles.container}>
            <Head>
                <title>t3lls commit creator</title>
                <link rel="icon" href="/data/media/t3.ico" />
            </Head>

            <Header title="Commit Creator" foreground="rgb(255, 255, 255)" background="rgb(249, 137, 0)"/>

            <div className={customStyles.body} style={{height: 'calc(100vh - 112px)'}}>

                <div className={customStyles.ratio70_30}>
                    <div>    
                        <div className={customStyles.title_box}>
                            <p>
                                COMMIT MESSAGE
                            </p>
                        </div>
                        <div className={customStyles.component_box}>
                            <textarea 
                                className={customStyles.input_box}
                                onChange={(e) => {
                                    setCommitMessage(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                value={commitMessage}
                                placeholder="Type your commit message here..."
                            />
                        </div>
                    </div>
                    <div>
                        <div className={customStyles.title_box}>
                            <p>
                                GIT COMMAND
                            </p>
                        </div>
                        <div className={customStyles.component_box}>
                            <textarea 
                                className={customStyles.input_box}
                                onChange={(e) => setCommitMessage(e.target.value)}
                                value={commitMessage}
                                placeholder="Your output will be displayed here..."
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={customStyles.date_time}>
                        <div className={customStyles.title_box}>
                            <p>
                                DATE & TIME
                            </p>
                        </div>
                    </div>
                </div>



                
            </div>

            <Footer title="Commit Creator" foreground="rgb(255, 255, 255)" background="rgb(58, 57, 57)"/>
        </div>
    )

}