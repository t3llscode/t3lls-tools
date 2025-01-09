import Head from 'next/head'
import Image from 'next/image' // better than <img> tag
import styles from './commit.module.scss'

import { useState, useEffect, useRef } from 'react';

export default function CommitCreator({ }) {

    let date = "2025-01-03T19:50:24"
    let asd = "V1.8.2 (use Docker secrets for db password, save schema, ditch old files)"
    let log = `GIT_COMMITTER_DATE="${date}" git commit -m "" --date="${date}"`

    const [dateTime, setDateTime] = useState<Date | null>(new Date())
    const [message, setMessage] = useState("")
    const [command, setCommand] = useState("")

    useEffect(() => {
        let messageString = ""
        let dateString = dateTime?.toISOString().replace('Z', '').slice(0, -4);
        if (message.trim()) { 
            const lines = message.split("\n").filter(line => line.trim() !== "");
            messageString = lines.map(line => `-m "${line.trim()}"`).join(" ") + " "
        }
        setCommand(`GIT_COMMITTER_DATE="${dateString}" git commit ${messageString}--date="${dateString}"`)
    }, [dateTime, message])

    return (
        <div className={styles.body}>
            <div className={styles.ratio70_30columns}>
                <div>
                    <p className={styles.box_title}>
                        MESSAGE
                    </p>
                    <textarea 
                        className={styles.no_box}
                        placeholder="Enter commit message"
                        rows={Math.max(4, (command.match(/\n/g) || []).length + 2)}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <p className={styles.box_title}>
                        DATE & TIME
                    </p>
                    <div className={styles.date_container}>
                        <input 
                            type="datetime-local" 
                            className={styles.no_box}
                            value={dateTime?.toISOString().slice(0, 16)}
                            onChange={(e) => {
                                const selectedDateTime = new Date(e.target.value);
                                setDateTime(selectedDateTime);
                            }}
                        />
                        <button 
                            onClick={() => {
                                const newDate = new Date(dateTime || new Date());
                                newDate.setSeconds(Math.floor(Math.random() * 60));
                                setDateTime(newDate);
                            }}
                            className={styles.no_box}
                        >
                            🎲
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.ratio100columns}>
                <div><p className={styles.box_title}>COMMAND</p><textarea className={styles.no_box} value={command} readOnly rows={Math.max(4, (command.match(/\n/g) || []).length + 2)} /></div>
            </div>
        </div>
    )
}