import Head from 'next/head'
import Image from 'next/image'
import styles from './commit.module.scss'
import { useState, useEffect } from 'react';
import React from 'react';

// Format date for datetime-local input
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export default function CommitCreator() {
    const [dateTime, setDateTime] = useState<Date | null>(new Date());
    const [message, setMessage] = useState("");
    const [command, setCommand] = useState("");
    const [allowTrue, setAllowTrue] = useState(false);
    const [prevMessage, setPrevMessage] = useState("");
    const [osType, setOsType] = useState<'linux' | 'windows'>('linux');
    const [addAll, setAddAll] = useState(false);
    const [prevAddAll, setPrevAddAll] = useState(false);

    useEffect(() => {
        let messageString = "";
        let dateString = dateTime ? formatDate(dateTime) : '';
        let msg = allowTrue ? "init: empty commit" : message;
        if (msg.trim()) {
            const lines = msg.split("\n").filter(line => line.trim() !== "");
            messageString = lines.map(line => `-m "${line.trim()}"`).join(" ") + " ";
        }
        let allow = allowTrue ? '--allow-true ' : '';
        let addAfter = addAll ? 'git add . && ' : '';
        let prefix = osType === 'windows'
            ? `set GIT_COMMITTER_DATE=\"${dateString}\" && `
            : `GIT_COMMITTER_DATE=\"${dateString}\" `;
        setCommand(`${prefix}${addAfter}git commit ${messageString}${allow}--date=\"${dateString}\"`.trim());
    }, [dateTime, message, allowTrue, addAll, osType]);

    // Helper for random date part
    const randomizeDate = () => {
        const newDate = new Date(dateTime || new Date());
        const getChecked = (id: string) => (document.getElementById(id) as HTMLInputElement)?.checked;
        if (getChecked('random-seconds')) newDate.setSeconds(Math.floor(Math.random() * 60));
        if (getChecked('random-minutes')) newDate.setMinutes(Math.floor(Math.random() * 60));
        if (getChecked('random-hours')) newDate.setHours(Math.floor(Math.random() * 24));
        if (getChecked('random-day')) newDate.setDate(Math.floor(Math.random() * 31) || 1);
        if (getChecked('random-month')) newDate.setMonth(Math.floor(Math.random() * 12));
        if (getChecked('random-year')) {
            const currentYear = new Date().getFullYear();
            newDate.setFullYear(currentYear - 5 + Math.floor(Math.random() * 10));
        }
        setDateTime(newDate);
    };

    return (
        <div className={styles.body}>
            <div className={styles.ratio70_30columns}>
                <div>
                    <p className={styles.box_title}>MESSAGE</p>
                    <textarea 
                        className={styles.no_box}
                        placeholder="Enter commit message"
                        rows={Math.max(4, (command.match(/\n/g) || []).length + 2)}
                        value={allowTrue ? 'init: empty commit' : message}
                        onChange={e => setMessage(e.target.value)}
                        disabled={allowTrue}
                    />
                </div>
                <div>
                    <p className={styles.box_title}>DATE & TIME</p>
                    <div className={styles.date_container}>
                        <br />
                        <div className={styles.date_field_container} onClick={e => {
                            const input = e.currentTarget.querySelector('input');
                            if (input) input.showPicker();
                            e.preventDefault();
                        }}>
                            <input 
                                type="datetime-local" 
                                className={styles.no_box_time}
                                value={dateTime ? formatDate(dateTime) : ''}
                                onChange={e => {
                                    if (e.target.value) {
                                        const selectedDateTime = new Date(e.target.value);
                                        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                                        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                                        if (isSafari || isFirefox) {
                                            const currentTime = selectedDateTime.toTimeString().slice(0,5);
                                            const userTime = window.prompt('Adjust time (HH:MM):', currentTime);
                                            if (userTime && /^\d{2}:\d{2}$/.test(userTime)) {
                                                const [h, m] = userTime.split(":").map(Number);
                                                selectedDateTime.setHours(h);
                                                selectedDateTime.setMinutes(m);
                                            }
                                        }
                                        setDateTime(selectedDateTime);
                                    }
                                }}
                                onMouseDown={e => e.preventDefault()}
                                style={{ userSelect: 'none' }}
                            />
                        </div>
                        <br />
                        <div className={styles.random_options}>
                            <button onClick={randomizeDate} className={styles.no_box}>
                                🎲 Randomize selected
                            </button>
                            <div className={styles.checkboxes} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', maxWidth: '220px' }}>
                                {[0,1,2].map(i => (
                                    <React.Fragment key={i}>
                                        <label className={styles.checkbox_label} style={{ gridColumn: 1 }}>
                                            <input
                                                type="checkbox"
                                                defaultChecked={true}
                                                id={`random-${['seconds','minutes','hours'][i]}`}
                                            />
                                            {['seconds','minutes','hours'][i]}
                                        </label>
                                        <label className={styles.checkbox_label} style={{ gridColumn: 2 }}>
                                            <input
                                                type="checkbox"
                                                id={`random-${['day','month','year'][i]}`}
                                            />
                                            {['day','month','year'][i]}
                                        </label>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div style={{ marginTop: '10px' }}></div>
                        <button onClick={() => setDateTime(new Date())} className={styles.no_box}>
                            ↻ reset to current date
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.ratio100columns}>
                <div>
                    <p className={styles.box_title}>COMMAND</p>
                    <div className={styles.commandRow}>
                        <textarea 
                            className={styles.no_box + ' ' + styles.commandTextarea}
                            placeholder="Enter command"
                            value={command}
                            readOnly
                            rows={Math.max(4, (command.match(/\n/g) || []).length + 2)}
                            style={{ fontFamily: 'inherit' }}
                        />
                        <div className={styles.commandActions}>
                            <div className={styles.commandGroup}>
                                <button
                                    className={styles.copyButton}
                                    onClick={() => navigator.clipboard.writeText(command)}
                                    title="Copy command to clipboard"
                                >
                                    Copy Command
                                </button>
                            </div>
                            <div className={styles.commandGroup} style={{margin: '0 10px'}}>
                                <span
                                    className={styles.initialCommitToggle + (addAll ? ' active' : '')}
                                    style={addAll ? { color: '#f98900' } : {}}
                                    onClick={() => { if (!allowTrue) setAddAll(v => !v); }}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={addAll}
                                    onKeyDown={e => { if (!allowTrue && (e.key === 'Enter' || e.key === ' ')) setAddAll(v => !v); }}
                                >
                                    git add .
                                </span>
                            </div>
                            <div className={styles.commandGroup} style={{margin: '0 10px'}}>
                                <span
                                    className={styles.initialCommitToggle + (allowTrue ? ' active' : '')}
                                    style={allowTrue ? { color: '#f98900' } : {}}
                                    onClick={() => {
                                        if (!allowTrue) {
                                            setPrevMessage(message);
                                            setPrevAddAll(addAll);
                                            setAllowTrue(true);
                                            setAddAll(false);
                                            setMessage('init: empty commit');
                                        } else {
                                            setAllowTrue(false);
                                            setAddAll(prevAddAll);
                                            setMessage(prevMessage);
                                        }
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    aria-pressed={allowTrue}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            if (!allowTrue) {
                                                setPrevMessage(message);
                                                setPrevAddAll(addAll);
                                                setAllowTrue(true);
                                                setAddAll(false);
                                                setMessage('init: empty commit');
                                            } else {
                                                setAllowTrue(false);
                                                setAddAll(prevAddAll);
                                                setMessage(prevMessage);
                                            }
                                        }
                                    }}
                                >
                                    Initial Commit
                                </span>
                            </div>
                            <div className={styles.commandGroup} style={{margin: '0 14px'}}>
                                <div className={styles.osRadioGroup}>
                                    <label className={styles.osRadioLabel + (osType === 'linux' ? ' ' + styles.selected : '')}>
                                        <input
                                            type="radio"
                                            name="osType"
                                            value="linux"
                                            checked={osType === 'linux'}
                                            onChange={() => setOsType('linux')}
                                        />
                                        Linux / Mac
                                    </label>
                                    <label className={styles.osRadioLabel + (osType === 'windows' ? ' ' + styles.selected : '')}>
                                        <input
                                            type="radio"
                                            name="osType"
                                            value="windows"
                                            checked={osType === 'windows'}
                                            onChange={() => setOsType('windows')}
                                        />
                                        Windows
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}