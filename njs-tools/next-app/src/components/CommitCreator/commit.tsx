import Head from 'next/head'
import Image from 'next/image' // better than <img> tag
import styles from './commit.module.scss'

import { useState, useEffect, useRef } from 'react';

// Function to format date for local datetime-local input
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export default function CommitCreator({ }) {

    let date = "2025-01-03T19:50:24"
    let asd = "V1.8.2 (use Docker secrets for db password, save schema, ditch old files)"
    let log = `GIT_COMMITTER_DATE="${date}" git commit -m "" --date="${date}"`

    const [dateTime, setDateTime] = useState<Date | null>(new Date())
    const [message, setMessage] = useState("")
    const [command, setCommand] = useState("")

    useEffect(() => {
        let messageString = ""
        // Convert to ISO but adjust for timezone offset to maintain the local time
        let dateString = dateTime ? formatDate(dateTime) : ''; // put in try catch, as is fails when the user is manually changing time (without 'choose date' UI)
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
                        <br></br>
                        <div className={styles.date_field_container} onClick={(e) => {
                            const input = e.currentTarget.querySelector('input');
                            if (input) input.showPicker();
                            e.preventDefault(); // Prevent default selection behavior
                        }}>
                            <input 
                                type="datetime-local" 
                                className={styles.no_box_time}
                                value={dateTime ? formatDate(dateTime) : ''}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        const selectedDateTime = new Date(e.target.value);
                                        setDateTime(selectedDateTime);
                                    }
                                }}
                                onMouseDown={(e) => e.preventDefault()} // Prevent text selection
                                style={{ userSelect: 'none' }} // CSS to prevent selection
                            />
                        </div>
                        <br></br>
                        <button 
                            onClick={() => setDateTime(new Date())}
                            className={styles.no_box}
                        >
                            ↻ reset to current date
                        </button>
                        <br></br>
                        <div className={styles.random_options}>
                            <div className={styles.checkboxes}>
                                {['seconds', 'minutes', 'hours', 'day', 'month', 'year'].map((unit) => (
                                    <label key={unit} className={styles.checkbox_label}>
                                        <input 
                                            type="checkbox" 
                                            defaultChecked={unit === 'seconds' || unit === 'minutes' || unit === 'hours'}
                                            id={`random-${unit}`}
                                        />
                                        {unit}
                                    </label>
                                ))}
                            </div>
                            <button 
                                onClick={() => {
                                    const newDate = new Date(dateTime || new Date());
                                    
                                    if ((document.getElementById('random-seconds') as HTMLInputElement)?.checked) {
                                        newDate.setSeconds(Math.floor(Math.random() * 60));
                                    }
                                    if ((document.getElementById('random-minutes') as HTMLInputElement)?.checked) {
                                        newDate.setMinutes(Math.floor(Math.random() * 60));
                                    }
                                    if ((document.getElementById('random-hours') as HTMLInputElement)?.checked) {
                                        newDate.setHours(Math.floor(Math.random() * 24));
                                    }
                                    if ((document.getElementById('random-day') as HTMLInputElement)?.checked) {
                                        newDate.setDate(Math.floor(Math.random() * 31) || 1);
                                    }
                                    if ((document.getElementById('random-month') as HTMLInputElement)?.checked) {
                                        newDate.setMonth(Math.floor(Math.random() * 12));
                                    }
                                    if ((document.getElementById('random-year') as HTMLInputElement)?.checked) {
                                        const currentYear = new Date().getFullYear();
                                        newDate.setFullYear(currentYear - 5 + Math.floor(Math.random() * 10));
                                    }
                                    
                                    setDateTime(newDate);
                                }}
                                className={styles.no_box}
                            >
                                🎲 Randomize selected
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.ratio100columns}>
                <div><p className={styles.box_title}>COMMAND</p><textarea className={styles.no_box} value={command} readOnly rows={Math.max(4, (command.match(/\n/g) || []).length + 2)} /></div>
            </div>
        </div>
    )
}